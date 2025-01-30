// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
import Navbar from "./Navbar";
// import Logo from "./Logo";
import AuthArea from "./AuthArea";
// import Sidebar from "./Sidebar";
// import { usePathname } from "next/navigation";

function Header() {
  // const [isScrolled, setIsScrolled] = useState(false);
  // const pathname = usePathname();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <Navbar>
      <AuthArea />
    </Navbar>
  );
}

export default Header;
