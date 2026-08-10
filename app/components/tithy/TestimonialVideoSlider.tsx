import {Swiper, SwiperSlide} from 'swiper/react';
import {TestimonialVideoPlayer} from './TestimonialVideoPlayer';

export function TestimonialVideoSlider({videos}: {videos: string[]}) {
  const fitsWithoutScroll = videos.length <= 4;

  return (
    <Swiper
      slidesPerView={1.75}
      spaceBetween={12}
      centeredSlides={false}
      breakpoints={{
        640: {
          slidesPerView: 'auto',
          spaceBetween: 16,
          centeredSlides: false,
        },
      }}
      className={`pb-2! ${fitsWithoutScroll ? 'sm:w-fit! sm:mx-auto!' : ''}`}
    >
      {videos.map((url) => (
        <SwiperSlide key={url} className="sm:w-56!">
          <TestimonialVideoPlayer url={url} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
