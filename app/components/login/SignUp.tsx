import { signup } from "@/app/login/actions";

interface SignUpProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setSignUp }: SignUpProps) {
  return (
    <>
      <h2 className="text-3xl font-bold">Sign up</h2>
      <p>
        Already have an Account?{" "}
        <button className="underline" onClick={() => setSignUp(false)}>
          Sign in
        </button>
      </p>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <button formAction={signup}>Sign up</button>
      </form>
    </>
  );
}

export default SignUp;
