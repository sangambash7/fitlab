import SignUpForm from "./SignUpForm";
import { useTranslations } from "next-intl";

interface SignUpProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setSignUp }: SignUpProps) {
  const t = useTranslations("Login");
  return (
    <>
      <h2 className="text-4xl font-bold">{t("Sign up")}</h2>
      <p className="text-sm">
        {t("Already have an Account?")}{" "}
        <button className="underline" onClick={() => setSignUp(false)}>
          {t("Sign in")}
        </button>
      </p>
      <SignUpForm />
    </>
  );
}

export default SignUp;
