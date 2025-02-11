import Link from "next/link";

interface HomeCardProps {
  heading: string;
  caption: string;
  route: string;
  routeLabel: string;
}

function HomeCard({ heading, caption, route, routeLabel }: HomeCardProps) {
  return (
    <div className="w-full h-[350px] lg:w-[300px] col-span-3 lg:col-span-1 dark:bg-slate-900 dark:rounded-md hover:bg-slate-50 hover:translate-y-[-25px] transition-transform duration-300">
      <Link href={`/${route}`}>
        <div className="flex flex-col w-full h-full items-center justify-between border-b-2 border-[#1B4A8E] py-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-[#1B4A8E] dark:bg-white w-[60px] h-[60px] rounded-md"></div>
            <div className="text-[#1B4A8E] dark:text-white font-bold text-[25px]">
              {heading}
            </div>
          </div>

          <div className="text-[20px] w-[80%] flex items-center">
            <p>{caption}</p>
          </div>
          <div className="font-bold text-[20px] text-[#1B4A8E] dark:text-white">
            {routeLabel}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HomeCard;
