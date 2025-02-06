import HomeCard from "./components/home/HomeCard";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

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
              {t("Personalise1")}{" "}
              <span className="text-[#1B4A8E] dark:text-white">
                {t("Personalise2")}
              </span>
            </div>
            <div className="text-[25px]">{t("Personalise_caption")}</div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="text-[45px]">
              <span className="text-[#1B4A8E] dark:text-white">{t("Why")}</span>
            </div>
            <div className="grid grid-cols-3 my-4 gap-8">
              <HomeCard
                heading={t("Heading1")}
                caption={t("Caption1")}
                route="clubs"
                routeLabel={t("routeLabel1")}
              />
              <HomeCard
                heading={t("Heading2")}
                caption={t("Caption2")}
                route="pricing"
                routeLabel={t("routeLabel2")}
              />
              <HomeCard
                heading={t("Heading3")}
                caption={t("Caption3")}
                route="about"
                routeLabel={t("routeLabel3")}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
