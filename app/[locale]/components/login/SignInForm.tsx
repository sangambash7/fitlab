"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { login } from "../../login/actions";

function SignInForm() {
  const t = useTranslations("Login");
  const [serverError, setServerError] = useState("");

  const handleAction = async (formData: FormData) => {
    const { error } = await login(formData);

    if (error) {
      setServerError(error);
      return;
    }
  };

  return (
    <>
      <form className="pt-4" action={handleAction}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("Email")}:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t("Password")}:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <button className="border bg-[#1B4A8E] dark:bg-slate-900 dark:font-bold text-white text-xl w-full rounded-sm mt-5">
          {t("Sign in")}
        </button>
      </form>
      {serverError === "invalid_credentials" && (
        <div className="flex flex-col text-red-700 mt-4">
          • {t("Your username or password is incorrect")}
        </div>
      )}
    </>
  );
}

export default SignInForm;
