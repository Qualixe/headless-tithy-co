import {Await} from 'react-router';
import {Suspense} from 'react';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import type {ShopPolicyLink} from '~/lib/tithy-queries';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  policies: Promise<ShopPolicyLink[]>;
  logoUrl: string | null;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  header,
  isLoggedIn,
  publicStoreDomain,
  policies,
  logoUrl,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
          logoUrl={logoUrl}
        />
      )}
      <main>{children}</main>
      <Footer
        header={header}
        publicStoreDomain={publicStoreDomain}
        policies={policies}
        logoUrl={logoUrl}
      />
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p className="p-4">Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}
