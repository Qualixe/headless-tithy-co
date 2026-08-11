import {Suspense} from 'react';
import {Await} from 'react-router';
import {Image, useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {Menu, ShoppingCart} from 'lucide-react';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {Aside, useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  logoUrl: string | null;
}

const NAV_ITEMS = [
  {id: 'about', label: 'About'},
  {id: 'ingredients', label: 'Ingredients'},
  {id: 'how-to-use', label: 'How to Use'},
  {id: 'reviews', label: 'Reviews'},
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({behavior: 'smooth'});
  } else {
    window.location.href = `/#${id}`;
  }
}

export function Header({header, cart, logoUrl}: HeaderProps) {
  const {shop} = header;
  const {open, close} = useAside();

  const logo = logoUrl ? (
    <Image
      src={logoUrl}
      alt={shop.name}
      aspectRatio="1841/441"
      width={134}
      height={32}
      className="h-8 w-auto object-contain"
    />
  ) : (
    <span className="font-medium text-lg">{shop.name}</span>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/20 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-3 h-14 md:h-16 grid grid-cols-3 items-center">
          <div className="flex items-center">
            <button
              onClick={() => open('mobile')}
              className="md:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-brand" />
            </button>
            <div className="hidden md:block">{logo}</div>
          </div>

          <div className="flex justify-center items-center">
            <div className="md:hidden">{logo}</div>
            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex justify-end">
            <CartToggle cart={cart} />
          </div>
        </div>
      </header>

      {/* Rendered outside <header> since its `backdrop-blur` would otherwise
          establish a containing block for this `fixed` overlay, trapping it
          inside the header's own small box instead of the full viewport. */}
      <Aside type="mobile" heading="MENU" side="left">
        <nav className="flex flex-col px-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                close();
                scrollToSection(item.id);
              }}
              className="text-left text-base font-medium py-4 border-b last:border-0 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </Aside>
    </>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartButton count={0} />}>
      <Await resolve={cart}>
        {(resolvedCart) => <CartBanner cart={resolvedCart} />}
      </Await>
    </Suspense>
  );
}

function CartBanner({cart: originalCart}: {cart: CartApiQueryFragment | null}) {
  const cart = useOptimisticCart(originalCart);
  return <CartButton count={cart?.totalQuantity ?? 0} />;
}

function CartButton({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="relative cursor-pointer"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-6 h-6 text-brand" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
