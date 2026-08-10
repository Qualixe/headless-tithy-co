import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperClass} from 'swiper/types';
import {Thumbs} from 'swiper/modules';

type GalleryImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export function ProductGallery({images}: {images: GalleryImage[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div>
      <Swiper
        modules={[Thumbs]}
        thumbs={{swiper: thumbsSwiper}}
        loop={images.length > 1}
        className="aspect-square rounded-xl overflow-hidden bg-gray-50"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.url} className="relative">
            <Image
              src={img.url}
              alt={img.altText || ''}
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading={i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesProgress
        slidesPerView="auto"
        spaceBetween={8}
        className="mt-3"
      >
        {images.map((img) => (
          <SwiperSlide key={img.url} className="!w-16 h-16">
            <button className="w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent [.swiper-slide-thumb-active_&]:border-black">
              <Image
                src={img.url}
                alt=""
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
