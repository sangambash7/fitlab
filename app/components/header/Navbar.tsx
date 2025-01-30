"use client";

import Link from "next/link";
import Logo from "./Logo";
import NavItems from "./NavItems";
import AuthArea from "./AuthArea";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function Navbar({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-20 ${
        pathname === "/"
          ? isScrolled
            ? "bg-[#1B4A8E] py-4 sticky top-0"
            : "bg-gray-600 bg-opacity-80 py-3 absolute"
          : "bg-[#1B4A8E] py-4 sticky top-0"
      }  flex justify-center transition-all duration-300`}
    >
      <div className="w-full xl:w-[1200px] mx-1 text-white">
        {" "}
        <div className="flex justify-between items-center">
          <Logo />
          {/* Nav Items */}
          <div className="hidden md:block">
            <ul className="flex gap-3">
              <NavItems />
            </ul>
          </div>
          <div className="flex gap-3 items-center">
            {children}
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
