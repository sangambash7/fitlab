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
    </>
  );
}

export default SignIn;
