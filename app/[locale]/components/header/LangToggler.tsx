"use client";
import { FaGlobeEurope } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function LangToggler() {
  const [current, setCurrent] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const locale = pathname.split("/")[1];
    setCurrent(locale);
  }, [pathname]);

  const handleSwitch = (language: string) => {
    const newPathname = pathname.replace(/^\/(en|ge)/, `/${language}`);
    router.push(newPathname);
  };

  return (
    <div>
      {/* <button onClick={() => handleSwitch("ge")}>Georgian</button>
      <button onClick={() => handleSwitch("en")}>English</button> */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-black dark:text-white"
            >
              <FaGlobeEurope />

              <span className="hidden sm:inline">
                {current === "en" ? "ENG" : "GEO"}
              </span>
              <span className="hidden sm:inline">
                <IoIosArrowDown />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-30">
            <DropdownMenuItem className="flex items-center justify-between">
              <button onClick={() => handleSwitch("en")}>English</button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => handleSwitch("ge")}>ქართული</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default LangToggler;
