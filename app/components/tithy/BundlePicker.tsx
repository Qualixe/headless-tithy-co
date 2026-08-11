import {Image} from '@shopify/hydrogen';
import {formatMoney} from '~/lib/money';
import {shopifyFileUrl} from '~/lib/shopifyFile';

type Money = {amount: string; currencyCode: string};

type Bundle = {
  qty: number;
  label: string;
  image: string;
  discountPct: number;
  badge: string | null;
};

export const BUNDLES: Bundle[] = [
  {
    qty: 1,
    label: '1 Box',
    image: shopifyFileUrl('bundle-1.png'),
    discountPct: 0,
    badge: null,
  },
  {
    qty: 2,
    label: '2 Boxes',
    image: shopifyFileUrl('bundle-2.png'),
    discountPct: 10,
    badge: 'Most Valuable',
  },
  {
    qty: 3,
    label: '3 Boxes',
    image: shopifyFileUrl('bundle-3.png'),
    discountPct: 10,
    badge: 'Recommended',
  },
];

export function BundlePicker({
  unitPrice,
  selectedQty,
  onSelect,
}: {
  unitPrice: Money;
  selectedQty: number;
  onSelect: (qty: number) => void;
}) {
  const unitAmount = Number(unitPrice.amount);

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Select Bundle</h2>
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {BUNDLES.map((bundle) => {
          const total = unitAmount * bundle.qty;
          const discounted = total * (1 - bundle.discountPct / 100);
          const saved = total - discounted;
          const isSelected = bundle.qty === selectedQty;

          return (
            <button
              key={bundle.qty}
              onClick={() => onSelect(bundle.qty)}
              className={`relative rounded-md cursor-pointer md:rounded-xl border text-center flex flex-col items-center transition-shadow p-3 pt-4 ${
                isSelected
                  ? 'border-brand shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {bundle.badge && (
                <div className="absolute -top-2.5 inset-x-0 flex justify-center">
                  <span
                    className={`${bundle.badge === 'Recommended' ? 'bg-black' : 'bg-brand'} text-white text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap`}
                  >
                    {bundle.badge}
                  </span>
                </div>
              )}

              <div className="w-16 h-16 sm:w-[90px] sm:h-[90px] rounded-md overflow-hidden bg-gray-50">
                <Image
                  src={bundle.image}
                  alt={bundle.label}
                  width={90}
                  height={90}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="font-medium mt-2 text-md ">{bundle.label}</div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
                <span className="font-medium text-sm">
                  {formatMoney({
                    amount: discounted.toFixed(2),
                    currencyCode: unitPrice.currencyCode,
                  })}
                </span>
                {bundle.discountPct > 0 && (
                  <span className="text-gray-400 line-through text-xs">
                    {formatMoney({
                      amount: total.toFixed(2),
                      currencyCode: unitPrice.currencyCode,
                    })}
                  </span>
                )}
              </div>

              {bundle.discountPct > 0 && (
                <span className="mt-1.5 bg-brand text-white text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap">
                  Save{' '}
                  {formatMoney({
                    amount: saved.toFixed(2),
                    currencyCode: unitPrice.currencyCode,
                  })}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
