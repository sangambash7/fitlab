import { signup } from "@/app/login/actions";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  retype_password: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
});

interface SignUpProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setSignUp }: SignUpProps) {
  return (
    <>
      <h2 className="text-4xl font-bold">Sign up</h2>
      <p className="text-sm">
        Already have an Account?{" "}
        <button className="underline" onClick={() => setSignUp(false)}>
          Sign in
        </button>
      </p>
      <form className="pt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Full name:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="fullname"
            name="fullname"
            type="fullname"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password:</label>
          <input
            className="bg-slate-50 border dark:text-black"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        {/* <div className="flex flex-col gap-2">
          <label htmlFor="password">Retype password:</label>
          <input
            className="bg-slate-50 border"
            id="retype_password"
            name="retype_password"
            type="password"
            required
          />
        </div> */}
        <button
          className="border bg-[#1B4A8E] dark:bg-slate-900 dark:font-bold text-white text-xl w-full rounded-sm mt-5"
          formAction={signup}
        >
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignUp;
