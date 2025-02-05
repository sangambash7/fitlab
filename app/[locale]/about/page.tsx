"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function page() {
  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex flex-col mt-8 gap-10">
        <div className="w-full grid grid-cols-5 gap-10 items-center ">
          <div className="col-span-5 text-xl">
            <h1 className="mb-6">Welcome To FitLab</h1>
            <div className="flex text-justify">
              At FitLab, we’re more than just a gym. We are a community of
              fitness enthusiasts, dedicated to helping you achieve your health
              and wellness goals. Whether you&apos;re a beginner or an
              experienced athlete, our state-of-the-art facilities cater to all
              your fitness needs. We offer flexible membership options tailored
              to fit your lifestyle, including access to top-tier gym equipment,
              personal training services, group fitness classes, and wellness
              programs. Our friendly and experienced team is here to provide the
              support you need to succeed in your fitness journey.
            </div>
          </div>
        </div>
        <div>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="/about/1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/about/2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/about/3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/about/4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/about/5.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  );
}

export default page;
