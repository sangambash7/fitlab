import Link from "next/link";

function NavItems() {
  return (
    <>
      {" "}
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
          <Link href={"/pricing"}>Pricing</Link>
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
          <Link href={"/about"}>About Us</Link>
        </button>
      </li>{" "}
      <li>
        <button className="hover:text-[#DDD]">
          <Link href={"/contact"}>Contact</Link>
        </button>
      </li>
    </>
  );
}

export default NavItems;
