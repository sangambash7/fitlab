"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileNavlink({ dest, label }: { dest: string; label: string }) {
  const pathname = usePathname();

  return (
    <li
      className={`transition-padding-all duration-300 hover:ps-4 hover:underline`}
    >
      <button className={`${pathname === dest && "italic font-bold text-lg"}`}>
        <Link href={`${dest}`}>{label}</Link>
      </button>
    </li>
  );
}

export default ProfileNavlink;
