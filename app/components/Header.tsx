import {Suspense} from 'react';
import {Await} from 'react-router';
import {Image, useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {ShoppingCart} from 'lucide-react';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  logoUrl: string | null;
}

export function Header({header, cart, logoUrl}: HeaderProps) {
  const {shop} = header;

  return (
    <header className="sticky top-0 z-40 bg-white/20 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={shop.name}
            aspectRatio="1841/441"
            width={134}
            height={32}
            className="h-8 w-auto object-contain"
          />
        ) : (
          <span className="font-semibold text-lg">{shop.name}</span>
        )}
        <CartToggle cart={cart} />
      </div>
    </header>
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
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
