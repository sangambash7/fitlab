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
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl"
          >
            <AiOutlineMenu />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-2xl"
          >
            <MdClose />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className={`md:hidden w-full absolute  ${
            !isOpen ? `right-[-100%]` : `right-0`
          } top-12 z-10 bg-[#1B4A8E] transition-all duration-1000 ease-in-out`}
        >
          <ul className="flex flex-col gap-3 ms-3">
            <NavItems />
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
