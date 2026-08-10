import {Image} from '@shopify/hydrogen';
import {ChevronRight} from 'lucide-react';
import {shopifyFileUrl} from '~/lib/shopifyFile';
import {ShopNowButton} from './ShopNowButton';

const STEPS = [
  {
    label: 'Cut',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`,
  },
  {
    label: 'Apply',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10.01h.01"/><path d="M10 14.01h.01"/><path d="M14 10.01h.01"/><path d="M14 14.01h.01"/><path d="M18 6v12"/><path d="M6 6v12"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  },
  {
    label: 'Leave',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`,
  },
  {
    label: 'Peel',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>`,
  },
];

export function ProductStory() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50">
          <Image
            src={shopifyFileUrl('image-text.png')}
            alt="Hydrocolloid Roll"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Hydrocolloid Roll
          </h2>
          <p className="text-gray-700 mt-3">
            ব্রণের দাগ, পিম্পল ও ছোটখাটো ক্ষত ঢেকে রাখুন — সহজ, পরিষ্কার ও
            ঝামেলামুক্তভাবে।
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Hydrocolloid Roll একটি flexible adhesive dressing, যা আক্রান্ত
            জায়গার উপর একটি protective barrier তৈরি করে এবং excess fluid/ooze
            শোষণ করে gel-এর মতো layer তৈরি করতে সাহায্য করে।
          </p>

          <div className="flex items-start mt-8">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-green-50 text-green-700 flex items-center justify-center"
                    dangerouslySetInnerHTML={{__html: step.icon}}
                  />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mt-4 mx-2 sm:mx-3 shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3">
            আপনার প্রয়োজন অনুযায়ী যেকোনো size-এ কেটে ব্যবহার করুন।
          </p>

          <ShopNowButton />
        </div>
      </div>
    </section>
  );
}
