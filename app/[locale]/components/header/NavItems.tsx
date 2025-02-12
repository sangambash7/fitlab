import Link from "next/link";
import { useTranslations } from "next-intl";

function NavItems() {
  const t = useTranslations("Header");
  return (
    <>
      <li>
        <button className="hover:text-[#DDD]">
          <Link href={"/"}>{t("Home")}</Link>
        </button>
      </li>
      <li>
        <button className="hover:text-[#DDD]">
          <Link href={"/clubs"}>{t("Clubs")}</Link>
        </button>
      </li>
      <li>
        <button className="hover:text-[#DDD]">
          <Link href={"/pricing"}>{t("Pricing")}</Link>
        </button>
      </li>
      <li>
        <button className="hover:text-[#DDD]">
          {" "}
          <Link href={"/shop"}>{t("Shop")}</Link>
        </button>
      </li>
      <li>
        <button className="hover:text-[#DDD]">
          <Link href={"/about"}>{t("About Us")}</Link>
        </button>
      </li>{" "}
      <li>
        <button className="hover:text-[#DDD]">
          <Link href={"/contact"}>{t("Contact")}</Link>
        </button>
      </li>
    </>
  );
}

export default NavItems;
