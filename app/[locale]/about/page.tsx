"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PartnerCard from "../components/about/PartnerCard";

function page() {
  return (
    <main className="flex justify-center">
      <div className="w-full p-2 xl:p-0 xl:w-[1200px] flex flex-col mt-8 gap-10">
        <div className="w-full grid grid-cols-5 gap-10 items-center ">
          <div className="col-span-5 text-xl ">
            {/* <h1 className="mb-6">Welcome To FitLab</h1> */}
            <div className="flex items-center justify-center">
              <h1 className="text-4xl mb-4">Welcome To FitLab</h1>
            </div>
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
        <div className="flex justify-center">
          <div className="w-[80%]">
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
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-4xl mb-4">Our Partners</h1>

          <div className="grid grid-cols-3 gap-2">
            <PartnerCard
              image="/about/nike.png"
              company="Nike"
              caption="Nike representative stores."
              url="https://www.nike.com/retail/directory/georgia"
              urlLabel="Nike Georgia Website"
            />
            <PartnerCard
              image="/about/marathon.png"
              company="Tbilisi Marathon"
              caption="Tbilisi Marathon – the biggest international sport event in Estonia."
              url="https://www.tbilisimarathon.ge/ka"
              urlLabel="Tbilisi Marathon Website"
            />
            <PartnerCard
              image="/about/tbc.png"
              company="TBC x Academy"
              caption="TBC x Academy – the best IT academy in Georgia."
              url="https://www.tbcacademy.ge/"
              urlLabel="TBC Academy Website"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
