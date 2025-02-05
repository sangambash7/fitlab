import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#1B4A8E] dark:bg-slate-900 flex justify-center">
      <div className="w-[1200px] mx-1 text-white">
        <div className="grid grid-cols-6 pt-6 pb-4 items-center">
          <div className="col-span-6 md:col-span-3 mb-6 md:mb-0">
            <ul className="flex gap-4 justify-center xl:justify-start">
              <li className="hover:underline">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="hover:underline">
                <Link href={"/about"}>About Our Company</Link>
              </li>
              <li className="hover:underline">
                <Link href={"/clubs"}>Clubs</Link>
              </li>
              <li className="hover:underline">
                <Link href={"/pricing"}>Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" width={120} height={120} alt="Logo" />

              <div className="italic text-[14px]">
                FitLab&apos;s mission is to empower individuals to achieve their
                fitness goals by providing top-tier gym facilities and
                high-quality equipment, ensuring a seamless and rewarding
                workout experience for all.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
