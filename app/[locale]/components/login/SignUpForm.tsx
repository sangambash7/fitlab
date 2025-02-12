"use client";

import { useTranslations } from "next-intl";
import { signup } from "../../login/actions";
import { z } from "zod";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const signUpSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(4, { message: "Full name must contain at least 4 characters" })
      .max(30, { message: "Full name must contain at most 30 characters" }),
    email: z
      .string()
      .email()
      .min(7, { message: "Email must contain at least 7 characters" }),
    personal_id: z
      .string()
      .length(11, {
        message: "Personal ID must contain 11 numbers",
      })
      .refine((value) => /^\d+$/.test(value), {
        message: "Personal ID must only contain numbers",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    retype_password: z
      .string()
      .min(8, { message: "Retyped password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.retype_password, {
    message: "Passwords don't match",
    path: ["retype_password"],
  });

function SignUpForm() {
  const t = useTranslations("Login");
  const [errorMessages, setErrorMessage] = useState<string[]>([]);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (formData: FormData) => {
    setErrorMessage([]);
    setServerError("");

    const userdata = {
      fullname: formData.get("fullname"),
      personal_id: formData.get("personal_id"),
      email: formData.get("email"),
      password: formData.get("password"),
      retype_password: formData.get("retype_password"),
    };

    const result = signUpSchema.safeParse(userdata);
    if (!result.success) {
      const newErrorMessages = result.error.issues.map(
        (issue) => issue.message
      );

      setErrorMessage((prevMessages) => [...prevMessages, ...newErrorMessages]);

      return;
    }
    setErrorMessage([]);
    setIsLoading(true);
    const { error } = await signup(formData);

    if (error) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  return (
    <>
      <form className="pt-4" action={handleAction}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("Full name")}:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="fullname"
            name="fullname"
            type="fullname"
            required
          />
        </div>
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
          <label htmlFor="email">{t("Personal ID")}:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="personal_id"
            name="personal_id"
            type="string"
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
        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t("Confirm password")}:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="retype_password"
            name="retype_password"
            type="password"
            required
          />
        </div>
        <button className="border bg-[#1B4A8E] dark:bg-slate-900 dark:font-bold text-white text-xl w-full rounded-sm mt-5">
          {t("Sign up")}
        </button>
      </form>
      {errorMessages && (
        <div className="flex flex-col text-red-700 mt-4">
          {errorMessages.map((warning, index) => (
            <div key={index} className="">
              • {warning}
            </div>
          ))}
        </div>
      )}
      {serverError === "user_already_exists" && (
        <div className="flex flex-col text-red-700 mt-4">
          • {t("This email is already registered")}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
}

export default SignUpForm;
