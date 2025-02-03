"use client";

import ClubInfo from "../components/clubs/ClubInfo";
import { useState } from "react";

const clubs = [
  {
    clubName: "Guramishvili",
    fullClubName: "FitLab Guramishvili",
    address: "Guramishvili Ave 25, Tbilisi",
    coord: {
      lat: 41.7706,
      lng: 44.79319,
    },
    time1: "Mon-Thu 6.30-22.00",
    time2: "Fri 6.30-21.00",
    time3: "Sat, Sun 9.00-21.00",
  },
  {
    clubName: "Saburtalo",
    fullClubName: "FitLab Saburtalo",
    address: "Vazha Pshavela Ave 70, Tbilisi",
    coord: {
      lat: 41.72427,
      lng: 44.73741,
    },
    time1: "Mon-Thu 6.30-22.00",
    time2: "Fri 6.30-21.00",
    time3: "Sat, Sun 8.30-21.00",
  },
  {
    clubName: "Marjanishvili",
    fullClubName: "FitLab Marjanishvili",
    address: "David Aghmashenebeli Ave 86, Tbilisi",
    coord: {
      lat: 41.70919,
      lng: 44.79716,
    },
    time1: "Mon-Thu 7.00-23.00",
    time2: "Fri 6.30-21.00",
    time3: "Sat, Sun 9.00-21.00",
  },
  {
    clubName: "Kutaisi",
    fullClubName: "FitLab Kutaisi",
    address: "Ioseb Grishashvili Street 7, Kutaisi",
    coord: {
      lat: 42.26882,
      lng: 42.7011,
    },
    time1: "Mon-Thu 7.30-22.00",
    time2: "Fri 7.30-21.00",
    time3: "Sat, Sun 9.00-21.00",
  },
  {
    clubName: "Batumi",
    fullClubName: "FitLab Batumi",
    address: "Pirosmani Street 21, Batumi",
    coord: {
      lat: 41.6387,
      lng: 41.61582,
    },
    time1: "Mon-Thu 6.30-21.30",
    time2: "Fri 7.30-21.00",
    time3: "Sat, Sun 8.00-21.00",
  },
];

function Clubs() {
  const [club, setClub] = useState("");

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex mt-8 gap-10">
        <div className="w-full flex flex-col">
          <div className="mx-4 xl:mx-0">
            <h1 className="text-[#1B4A8E] text-[3rem] font-bold">Clubs</h1>
            <p className="w-100 md:w-[60%] text-[20px]">
              FitLab is the biggest sports clubs chain in Georgia; it operates 5
              clubs in Georgia, including 3 clubs in capital Tbilisi. Spacious
              training halls, well equipped gyms, always new and versatile
              training programs, and our best trainers await you in all of our
              clubs. Pick the club you like and start training already today!
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 my-8">
            <div
              onClick={() => setClub("Guramishvili")}
              className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Guramishvili
            </div>
            <div
              onClick={() => setClub("Saburtalo")}
              className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Saburtalo
            </div>
            <div
              onClick={() => setClub("Marjanishvili")}
              className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Marjanishvili
            </div>
            <div
              onClick={() => setClub("Kutaisi")}
              className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
            >
              Kutaisi
            </div>
            <div
              onClick={() => setClub("Batumi")}
              className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]"
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
