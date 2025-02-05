import HomeCard from "./components/home/HomeCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="relative">
        <img
          alt="Intro Image"
          src="home/intro.jpg"
          className="h-[50vh] w-full object-cover"
        />
      </div>
      <div className="flex justify-center mt-6">
        <div className="w-[1100px]">
          <div className="flex flex-col items-center gap-4">
            <div className="text-[45px]">
              Personalise Your{" "}
              <span className="text-[#1B4A8E] dark:text-white">
                Fitness Your Way with FITLAB
              </span>
            </div>
            <div className="text-[25px]">
              Get ready for a new experience, a new journey, and a stronger you.
              At FITLAB, we empower you to train your way, at your pace, with no
              limits. Your fitness, your rules!
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="text-[45px]">
              <span className="text-[#1B4A8E] dark:text-white">
                WHY TO JOIN FITLAB CLUB?
              </span>
            </div>
            <div className="grid grid-cols-3 my-4 gap-8">
              <HomeCard
                heading="More than a gym"
                caption="Sauna and steam bath in all clubs."
                route="clubs"
                routeLabel="Show Clubs"
              />
              <HomeCard
                heading="Always reasonable prices"
                caption="Fitness that fits your budget."
                route="pricing"
                routeLabel="Show Prices"
              />
              <HomeCard
                heading="Don't you want to train alone?"
                caption="You can join group trainings."
                route="about"
                routeLabel="Show More"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
