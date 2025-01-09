"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";

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
      )}
    </>
  );
}

export default Sidebar;
