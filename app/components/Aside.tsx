import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useId} from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
  side = 'right',
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
  side?: 'left' | 'right';
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const id = useId();

  // Skip the slide/fade transition on the very first paint so a slow-loading
  // stylesheet can't make the closed aside flash open before snapping shut.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      // Hiding this purely via Tailwind classes (translate-x-full etc.) means
      // it depends on the stylesheet having loaded — on a cold dev-server
      // start that can take a second or two, during which the unstyled,
      // unhidden content would flash on screen. An inline style has no such
      // dependency: the browser applies it immediately on first paint. Only
      // used pre-mount though — permanently forcing display:none would also
      // break the slide transition on every future open (can't animate from
      // display:none in the same update), so once mounted we fall back to
      // the class-based hide, which animates smoothly.
      style={!mounted && !expanded ? {display: 'none'} : undefined}
      className={`fixed inset-0 z-50 ${expanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
      role="dialog"
      aria-labelledby={id}
    >
      <button
        className={`absolute inset-0 bg-black/40 ${mounted ? 'transition-opacity' : ''} ${expanded ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
      />
      <div
        className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col ${mounted ? 'transition-transform' : ''} ${
          expanded
            ? 'translate-x-0'
            : side === 'left'
              ? '-translate-x-full'
              : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b shrink-0">
          <h3 id={id} className="font-semibold text-lg tracking-wide">
            {heading}
          </h3>
          <button
            className="text-xl cursor-pointer"
            onClick={close}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
