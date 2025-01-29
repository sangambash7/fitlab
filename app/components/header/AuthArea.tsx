"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

function AuthArea() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      if (data) setIsAuthenticated(true);
    }

    checkUser();
  }, []);

  async function SignOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      {!isAuthenticated ? (
        <>
          <button className="bg-slate-100 text-blue-700 rounded-md py-1 px-4">
            Login
          </button>
          <button className="bg-blue-700 text-white rounded-md py-1 px-4">
            Join
          </button>
        </>
      ) : (
        <button onClick={SignOut}>Sign Out</button>
      )}
    </>
  );
}

export default AuthArea;
