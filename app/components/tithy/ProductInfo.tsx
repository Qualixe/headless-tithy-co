import {useEffect, useRef, useState} from 'react';
import type {TithyProduct} from '~/lib/tithy-queries';
import {formatMoney} from '~/lib/money';
import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/AddToCartButton';
import {BundleSelector} from './BundleSelector';
import {BundlePicker, BUNDLES} from './BundlePicker';

export function ProductInfo({product}: {product: TithyProduct}) {
  const {open} = useAside();
  const [variant, setVariant] = useState(product.variants[0]);
  const [bundleQty, setBundleQty] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const mainButtonRef = useRef<HTMLDivElement>(null);

  const selectedBundle = BUNDLES.find((b) => b.qty === bundleQty)!;
  const bundleTotal =
    Number(variant.price.amount) *
    selectedBundle.qty *
    (1 - selectedBundle.discountPct / 100);
  const price = {
    amount: bundleTotal.toFixed(2),
    currencyCode: variant.price.currencyCode,
  };

  useEffect(() => {
    const el = mainButtonRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      {threshold: 0},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const disabled = !variant.availableForSale;
  const label = disabled ? 'Sold out' : `Add to Cart - ${formatMoney(price)}`;
  const lines = [
    {
      merchandiseId: variant.id,
      quantity: bundleQty,
    },
  ];

  return (
    <div className="flex flex-col py-2 md:py-4">
      <h1 className="text-2xl capitalize !m-0 md:text-4xl text-brand font-quicksand font-normal pb-1">
        {product.title}
      </h1>
      {product.subtitle && (
        <p className="text-gray-500 pb-3">{product.subtitle}</p>
      )}

      <div className="flex items-baseline gap-3 pb-3">
        <span className="text-xl font-bold">{formatMoney(variant.price)}</span>
        {variant.compareAtPrice && (
          <span className="text-gray-400 line-through">
            {formatMoney(variant.compareAtPrice)}
          </span>
        )}
      </div>

      {product.shortDescription && (
        <div className="pb-4">
          <h2 className="text-lg font-medium mb-2">কেন Hydrocolloid Roll?</h2>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {product.shortDescription}
          </p>
        </div>
      )}

      {product.variants.length > 1 && (
        <div className="pb-4">
          <BundleSelector
            variants={product.variants}
            selected={variant}
            onSelect={setVariant}
          />
        </div>
      )}

      <div className="pb-4">
        <BundlePicker
          unitPrice={variant.price}
          selectedQty={bundleQty}
          onSelect={setBundleQty}
        />
      </div>

      <div ref={mainButtonRef} className="[&_form]:w-full [&_form]:max-w-full">
        <AddToCartButton
          disabled={disabled}
          lines={lines}
          onClick={() => open('cart')}
        >
          {label}
        </AddToCartButton>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/20 backdrop-blur p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-[300px] mx-auto [&_form]:w-full [&_form]:max-w-full">
          <AddToCartButton
            disabled={disabled}
            lines={lines}
            onClick={() => open('cart')}
          >
            {label}
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
