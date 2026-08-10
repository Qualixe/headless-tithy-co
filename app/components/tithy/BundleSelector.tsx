import {formatMoney} from '~/lib/money';

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {amount: string; currencyCode: string};
  compareAtPrice: {amount: string; currencyCode: string} | null;
  selectedOptions: {name: string; value: string}[];
};

export function BundleSelector({
  variants,
  selected,
  onSelect,
}: {
  variants: Variant[];
  selected: Variant;
  onSelect: (v: Variant) => void;
}) {
  return (
    <div className="grid gap-2">
      {variants.map((v) => (
        <button
          key={v.id}
          onClick={() => onSelect(v)}
          className={`border rounded-lg p-3 text-left ${v.id === selected.id ? 'border-black' : 'border-gray-200'}`}
        >
          <div className="font-medium">{v.title}</div>
          <div className="text-sm text-gray-500">{formatMoney(v.price)}</div>
        </button>
      ))}
    </div>
  );
}
