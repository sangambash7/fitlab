import Link from "next/link";
import { signOut } from "@/actions/authActions";
import Logout from "../Logout";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { CgProfile } from "react-icons/cg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function AuthArea() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const t = await getTranslations("Header");

  return (
    <>
      {!user ? (
        <>
          <button className="bg-slate-100 dark:text-white dark:bg-black dark:border dark:border-foreground text-blue-700 rounded-md py-1 px-4">
            <Link href="/login">{t("Login")}</Link>
          </button>
          {/* <button className="bg-blue-700 text-white dark:bg-white dark:text-slate-900 rounded-md py-1 px-4">
            <Link href="/login">{t("Join")}</Link>
          </button> */}
        </>
      ) : (
        <div className="bg-slate-100 dark:bg-black dark:text-white text-blue-700 hover:bg-slate-300 rounded-md py-1 px-4 cursor-pointer">
          {/*  */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="text-nowrap inline-flex items-center justify-center gap-1">
                <span className="lg:hidden inline-flex items-center gap-2">
                  <CgProfile /> &#x21b4;
                </span>
                <span className="hidden lg:inline">
                  {t("My Account")} &#x21b4;
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/profile"} className="text-[1rem] w-full">
                  {t("Profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile/fitlabPass"}
                  className="text-[1rem] w-full"
                >
                  {/* {t("Orders")} */}
                  Fitlab Pass
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="text-[1rem] font-bold">
                  <Logout />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}

export default AuthArea;
