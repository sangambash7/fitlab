import { useTranslations } from "next-intl";
import SignInForm from "./SignInForm";

interface SignInProps {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignIn({ setSignUp }: SignInProps) {
  const t = useTranslations("Login");
  return (
    <>
      <h2 className="text-4xl font-bold">{t("Sign in")}</h2>
      <p className="text-sm">
        {t("Don't have an Account?")}{" "}
        <button className="underline" onClick={() => setSignUp(true)}>
          {t("Sign up")}
        </button>
      </p>
      <SignInForm />
    </>
  );
}

export default SignIn;
