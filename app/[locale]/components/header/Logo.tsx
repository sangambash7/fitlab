import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div>
      <Link href={"./"}>
        <Image src="/logo.png" width={110} height={110} alt="Logo" />
      </Link>
    </div>
  );
}

export default Logo;
