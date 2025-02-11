"use client";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import NavItems from "./NavItems";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl relative w-8 h-8 flex items-center justify-center"
        >
          <AiOutlineMenu
            className={`absolute transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          />
          <MdClose
            className={`absolute transition-all duration-300 ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </button>
      </div>
      <div
        className={`md:hidden w-full absolute  ${
          !isOpen
            ? `left-[-100%] opacity-0 scale-0 `
            : `left-0 opacity-100 scale-100`
        } top-[65px] z-10 bg-[#1B4A8E] dark:bg-slate-900 transition-all duration-1000 ease-in-out`}
      >
        <ul className="flex flex-col gap-3 ms-5">
          <NavItems />
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
