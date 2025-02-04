import Link from "next/link";
import { signOut } from "@/actions/authActions";
import Logout from "../Logout";
import { createClient } from "@/utils/supabase/server";

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

  return (
    <>
      {!user ? (
        <>
          <button className="bg-slate-100 text-blue-700 rounded-md py-1 px-4">
            <Link href="/login">Login</Link>
          </button>
          <button className="bg-blue-700 text-white rounded-md py-1 px-4">
            <Link href="/login">Join</Link>
          </button>
        </>
      ) : (
        <div className="bg-slate-100 text-blue-700 hover:bg-slate-300 rounded-md py-1 px-4 cursor-pointer">
          {/*  */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div>My Account &#x21b4;</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/profile"} className="text-[1rem] w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/profile/orders"} className="text-[1rem] w-full">
                  Orders
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
