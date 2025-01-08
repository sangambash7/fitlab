import Link from "next/link";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

function Header() {
  return (
    <header className="bg-[#1B4A8E] text-white w-full text-lg flex justify-center py-2">
      <div className="w-full xl:w-[1200px] mx-1">
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
            <button className="bg-slate-100 text-blue-700 rounded-md py-1 px-4">
              Login
            </button>
            <button className="bg-blue-700 text-white rounded-md py-1 px-4">
              Join
            </button>
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
