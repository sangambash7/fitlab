import { useTranslations } from "next-intl";
import { signOut } from "@/actions/authActions";

function Logout() {
  const t = useTranslations("Header");
  return <button onClick={signOut}>{t("Log Out")}</button>;
}

export default Logout;
