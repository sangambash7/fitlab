"use client";
import { useTranslations } from "next-intl";
import ClubInfo from "../components/clubs/ClubInfo";
import { useState } from "react";

function Clubs() {
  const t = useTranslations("Clubs");
  const [club, setClub] = useState("");

  const clubs = [
    {
      clubName: "Guramishvili",
      fullClubName: "FitLab Guramishvili",
      address: t("addr1"),
      coord: {
        lat: 41.7706,
        lng: 44.79319,
      },
      time1: `${t("Mon")}-${t("Thu")} 6.30-22.00`,
      time2: `${t("Fri")} 6.30-21.00`,
      time3: `${t("Sat")}, ${t("Sun")} 9.00-21.00`,
    },
    {
      clubName: "Saburtalo",
      fullClubName: "FitLab Saburtalo",
      address: t("addr2"),
      coord: {
        lat: 41.72427,
        lng: 44.73741,
      },
      time1: `${t("Mon")}-${t("Thu")} 6.30-22.00`,
      time2: `${t("Fri")} 6.30-21.00`,
      time3: `${t("Sat")}, ${t("Sun")} 8.30-21.00`,
    },
    {
      clubName: "Marjanishvili",
      fullClubName: "FitLab Marjanishvili",
      address: t("addr3"),
      coord: {
        lat: 41.70919,
        lng: 44.79716,
      },
      time1: `${t("Mon")}-${t("Thu")} 7.00-23.00`,
      time2: `${t("Fri")} 6.30-21.00`,
      time3: `${t("Sat")}, ${t("Sun")} 9.00-21.00`,
    },
    {
      clubName: "Kutaisi",
      fullClubName: "FitLab Kutaisi",
      address: t("addr4"),
      coord: {
        lat: 42.26882,
        lng: 42.7011,
      },
      time1: `${t("Mon")}-${t("Thu")} 7.30-22.00`,
      time2: `${t("Fri")} 7.30-21.00`,
      time3: `${t("Sat")}, ${t("Sun")} 9.00-21.00`,
    },
    {
      clubName: "Batumi",
      fullClubName: "FitLab Batumi",
      address: t("addr5"),
      coord: {
        lat: 41.6387,
        lng: 41.61582,
      },
      time1: `${t("Mon")}-${t("Thu")} 6.30-21.30`,
      time2: `${t("Fri")} 7.30-21.00`,
      time3: `${t("Sat")}, ${t("Sun")} 8.00-21.00`,
    },
  ];

  return (
    <main className="flex justify-center dark:bg-black">
      <div className="w-[1200px] flex mt-8 gap-10">
        <div className="w-full flex flex-col">
          <div className="mx-4 xl:mx-0">
            <div className="flex md:justify-center xl:justify-start mb-4">
              <h1 className="text-[#1B4A8E] dark:text-white text-[3rem] font-bold">
                {t("heading")}
              </h1>
            </div>
            <div className="flex md:justify-center xl:justify-start">
              <p className="w-100 md:w-[60%] text-[20px]">{t("description")}</p>
            </div>
          </div>
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 my-8">
            <div
              onClick={() => setClub("Guramishvili")}
              className="bg-[#fafafa] dark:bg-black dark:border dark:border-white dark:text-white text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Guramishvili
            </div>
            <div
              onClick={() => setClub("Saburtalo")}
              className="bg-[#fafafa] dark:bg-black dark:border dark:border-white dark:text-white text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Saburtalo
            </div>
            <div
              onClick={() => setClub("Marjanishvili")}
              className="bg-[#fafafa] dark:bg-black dark:border dark:border-white dark:text-white text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Marjanishvili
            </div>
            <div
              onClick={() => setClub("Kutaisi")}
              className="bg-[#fafafa] dark:bg-black dark:border dark:border-white dark:text-white text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Kutaisi
            </div>
            <div
              onClick={() => setClub("Batumi")}
              className="bg-[#fafafa] dark:bg-black dark:border dark:border-white dark:text-white text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Batumi
            </div>
          </div>

          {club && <ClubInfo club={clubs.find((c) => club === c.clubName)} />}
        </div>
      </div>
    </main>
  );
}

export default Clubs;
