import {TestimonialVideoSlider} from './TestimonialVideoSlider';

const HEADING = 'What customers say';
const SUBHEADING = 'আমাদের গ্রাহকদের real experience, তাদেরই ভাষায়';

export function TestimonialVideo({videos}: {videos: string[]}) {
  if (videos.length === 0) return null;

  return (
    <section id="reviews" className="scroll-mt-16 py-3 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto px-3">
          <h2 className="text-xl md:text-3xl font-semibold mb-1">{HEADING}</h2>
          <p className="text-gray-500 mt-1 mb-4 md:mb-8">{SUBHEADING}</p>
        </div>

        <div className="pl-3 sm:px-4">
          <TestimonialVideoSlider videos={videos} />
        </div>
      </div>
    </section>
  );
}
