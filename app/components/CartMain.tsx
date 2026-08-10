import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {ShoppingCart} from 'lucide-react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem, type CartLine} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

export type LineItemChildrenMap = {[parentId: string]: CartLine[]};
/** Returns a map of all line items and their children. */
function getLineItemChildrenMap(lines: CartLine[]): LineItemChildrenMap {
  const children: LineItemChildrenMap = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}
/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  return (
    <section
      className="flex flex-col flex-1 min-h-0"
      aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}
    >
      {linesCount ? (
        <div className="flex-1 min-h-0 flex flex-col">
          <p id="cart-lines" className="sr-only">
            Line items
          </p>
          <ul aria-labelledby="cart-lines" className="flex-1 overflow-y-auto">
            {(cart?.lines?.nodes ?? []).map((line) => {
              // we do not render non-parent lines at the root of the cart
              if (
                'parentRelationship' in line &&
                line.parentRelationship?.parent
              ) {
                return null;
              }
              return (
                <CartLineItem
                  key={line.id}
                  line={line}
                  layout={layout}
                  childrenMap={childrenMap}
                />
              );
            })}
          </ul>
          {cartHasItems && <CartSummary cart={cart} layout={layout} />}
        </div>
      ) : (
        <CartEmpty />
      )}
    </section>
  );
}

function CartEmpty() {
  const {close} = useAside();
  return (
    <div className="flex flex-col items-center text-center h-full py-16 px-4">
      <div className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mb-4">
        <ShoppingCart className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-lg">Your cart is empty</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-xs">
        Looks like you haven&rsquo;t added anything to your cart yet.
      </p>
      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="mt-6 bg-black text-white! rounded-lg px-6 py-3 font-medium cursor-pointer"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
