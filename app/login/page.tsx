"use client";

import { useState } from "react";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";

function Login() {
  const [signUp, setSignUp] = useState(false);

  return (
    <main className="flex justify-center h-screen overflow-hidden">
      <div className="grid md:grid-cols-2 ">
        <div className="hidden md:block ">
          <img alt="Intro Image" src="login/login.jpg" className="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          {!signUp ? (
            <SignIn setSignUp={setSignUp} />
          ) : (
            <SignUp setSignUp={setSignUp} />
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;
