import { login } from "@/app/login/actions";

interface SignInProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignIn({ setSignUp }: SignInProps) {
  return (
    <>
      <h2 className="text-4xl font-bold">Sign in</h2>
      <p className="text-sm">
        Don&apos;t have an Account?{" "}
        <button className="underline" onClick={() => setSignUp(true)}>
          Sign up
        </button>
      </p>
      <form className="pt-4">
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
        <button
          className="border bg-[#1B4A8E] dark:bg-slate-900 dark:font-bold text-white text-xl w-full rounded-sm mt-5"
          formAction={login}
        >
          Log in
        </button>
      </form>
    </>
  );
}

export default SignIn;
