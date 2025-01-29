"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import AuthArea from "./AuthArea";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

function Header() {
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
    <>
      <header
        className={`w-full z-20 ${
          pathname === "/"
            ? isScrolled
              ? "bg-[#1B4A8E] py-4 sticky top-0"
              : "bg-gray-500 bg-opacity-80 py-3 absolute"
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
                <li>
                  <button className="hover:text-[#DDD]">
                    <Link href={"/"}>Home</Link>
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#DDD]">
                    <Link href={"/clubs"}>Clubs</Link>
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#DDD]">
                    {" "}
                    <Link href={"/shop"}>Shop</Link>
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#DDD]">
                    <Link href={"/contact"}>Contact</Link>
                  </button>
                </li>
                <li>
                  <button className="hover:text-[#DDD]">
                    <Link href={"/about"}>About Us</Link>
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex gap-3 items-center">
              <AuthArea />
              <Sidebar />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
