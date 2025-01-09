import Image from "next/image";

function Logo() {
  return (
    <div>
      <Image src="/logo.png" width={100} height={100} alt="Logo" />
    </div>
  );
}

export default Logo;
