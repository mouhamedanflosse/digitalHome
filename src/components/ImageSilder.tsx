"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type swiperType from "swiper";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface props {
  urls: string[];
}
export default function ImageSilder({ urls }: props) {
  const [swiper, setSwiper] = useState<null | swiperType>(null);
  const [indexSilde, setIndexSilde] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    begining: true,
    End: indexSilde === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setIndexSilde(activeIndex);
      setSlideConfig({
        begining: activeIndex === 0,
        End: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  const activeStyle =
    "active:scale-[0.97] transition p-1.5 absolute z-30  rounded-full bg-gray-100 hover:bg-gray-50 hover:scale-105 opcity-100";

  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden">
      <div className="absolute w-full opacity-0 z-10 px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext();
          }}
          aria-label="next image button"
          className={cn(
            activeStyle,
            { "hidden": slideConfig.End },
           "right-2"
          )}
        >
          <ChevronLeft className="w-4 h-4 font-bold text-gray-700" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev();
          }}
          aria-label="prevouis image button"
          className={cn(
            activeStyle,
            { "hidden": slideConfig.begining },
           " left-2"
          )}
        >
          <ChevronRight className="w-4 beginning h-4 font-bold text-gray-700" />
        </button>
      </div>
      <Swiper
        pagination={{renderBullet : (_,className) => {
          return `<span class="rounded-full transition ${className}"></span>`
        }}}
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={1}
        spaceBetween={50}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {urls.map((url, i) => {
          return (
            <SwiperSlide key={i}>
              <Image
                className="w-full -z-10 h-full object-cover object-center"
                fill
                src={url}
                alt="the product image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
