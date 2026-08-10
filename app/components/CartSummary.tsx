import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {type OptimisticCart} from '@shopify/hydrogen';
import {useId} from 'react';
import {formatMoney} from '~/lib/money';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className = layout === 'page' ? 'py-6 border-t' : 'px-4 py-4 border-t shrink-0';
  const summaryId = useId();

  return (
    <div aria-labelledby={summaryId} className={className}>
      <h4 id={summaryId} className="sr-only">
        Totals
      </h4>
      <div className="flex justify-between items-center mb-4">
        <span>Total</span>
        <span className="font-semibold">
          {cart?.cost?.subtotalAmount?.amount &&
          cart.cost.subtotalAmount.currencyCode
            ? formatMoney({
                amount: cart.cost.subtotalAmount.amount,
                currencyCode: cart.cost.subtotalAmount.currencyCode,
              })
            : '-'}
        </span>
      </div>
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <a
      href={checkoutUrl}
      target="_self"
      className="block text-center bg-black text-white! rounded-lg py-4 font-medium uppercase tracking-wide"
    >
      Continue to checkout &rarr;
    </a>
  );
}
