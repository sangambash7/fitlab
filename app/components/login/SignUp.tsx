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
    </>
  );
}

export default SignUp;
