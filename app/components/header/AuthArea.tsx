// "use client";

import { signOut, getUser } from "@/actions/authActions";
import { createClient } from "@/utils/supabase/server";
// import { useEffect, useState } from "react";

async function AuthArea() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  console.log(data, user);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   async function checkUser() {
  //     const supabase = await createClient();
  //     const { data } = await supabase.auth.getUser();
  //     if (data) setIsAuthenticated(true);
  //   }

  //   checkUser();
  // }, []);

  // async function SignOut() {
  //   const supabase = await createClient();

  //   const { error } = await supabase.auth.signOut();
  // }

  return (
    <>
      {!user ? (
        <>
          <button className="bg-slate-100 text-blue-700 rounded-md py-1 px-4">
            Login
          </button>
          <button className="bg-blue-700 text-white rounded-md py-1 px-4">
            Join
          </button>
        </>
      ) : (
        <button className="bg-slate-100 text-blue-700 rounded-md py-1 px-4">
          My Profile
          {/* <button onClick={signOut}>
            <img
              src="/profile-icon.png"
              width="30"
              style={{ backgroundImage: "#E5C16E" }}
            />
            Sign Out
          </button> */}
        </button>
      )}
    </>
  );
}

export default AuthArea;
