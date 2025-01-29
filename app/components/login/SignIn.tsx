import { login } from "@/app/login/actions";

interface SignInProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignIn({ setSignUp }: SignInProps) {
  return (
    <>
      <h2 className="text-3xl font-bold">Sign in</h2>
      <p>
        Don&apos;t have an Account?{" "}
        <button className="underline" onClick={() => setSignUp(true)}>
          Sign up
        </button>
      </p>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
      </form>
    </>
  );
}

export default SignIn;
