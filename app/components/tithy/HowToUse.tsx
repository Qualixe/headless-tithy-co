const HEADING = 'কীভাবে Hydrocolloid Roll কাজ করে?';
const SUBHEADING =
  'ত্বকের সুরক্ষা ও recovery-তে ধাপে ধাপে যেভাবে কাজ করে Hydrocolloid Roll';

const STEPS = [
  {
    title: 'Absorb',
    text: 'আক্রান্ত জায়গা থেকে বের হওয়া excess fluid, oil ও exudate শোষণ করতে সাহায্য করে।',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12q2.5 2 5 0t5 0 5 0 5 0"/><path d="M2 19q2.5 2 5 0t5 0 5 0 5 0"/><path d="M2 5q2.5 2 5 0t5 0 5 0 5 0"/></svg>`,
  },
  {
    title: 'Gel Formation',
    text: 'Hydrocolloid উপাদানগুলো moisture-এর সংস্পর্শে এসে gel-এর মতো layer তৈরি করে।',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="7"/><circle cx="15" cy="15" r="7"/></svg>`,
  },
  {
    title: 'Protect',
    text: 'উপর থেকে একটি protective barrier তৈরি করে, ফলে বারবার হাত দিয়ে পিম্পল/ক্ষত স্পর্শ বা খোঁচানোর প্রবণতা কমে।',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  },
  {
    title: 'Support Skin Recovery',
    text: 'একটি moist healing environment বজায় রাখতে সাহায্য করে, যা ত্বকের natural recovery process-এর জন্য সহায়ক।',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`,
  },
  {
    title: 'Easy & Customizable',
    text: 'Roll হওয়ায় প্রয়োজন অনুযায়ী ছোট-বড় করে কেটে ব্যবহার করা যায়।',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>`,
  },
];

export function HowToUse() {
  return (
    <section id="how-to-use" className="scroll-mt-16 bg-gray-50 py-4 md:py-16">
      <div className="max-w-6xl mx-auto px-3">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-medium mb-1">{HEADING}</h2>
          <p className="text-gray-500 mb-8">{SUBHEADING}</p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.title} className="flex sm:block gap-3">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-md bg-brand/10 text-brand flex items-center justify-center mb-0 sm:mb-3"
                dangerouslySetInnerHTML={{__html: s.icon}}
              />
              <div>
                <h3 className="font-medium text-md mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
