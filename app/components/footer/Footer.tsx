import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-[#1B4A8E] flex justify-center">
      <div className="w-[1200px] mx-1 text-white">
        <div className="grid grid-cols-6 pt-6 pb-4 items-center">
          <div className="col-span-3">
            <ul className="flex gap-4">
              <li>Contact</li>
              <li>About Our Company</li>
              <li>Clubs</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="col-span-3">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" width={120} height={120} alt="Logo" />

              <div className="italic text-[20px]">
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
