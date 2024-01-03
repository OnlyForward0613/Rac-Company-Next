import Link from "next/link";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import LoginForm from "~/components/Forms/Login/LoginForm";
import Logo from "~/components/Logo";
import { useAuthContext } from "~/contexts/AuthContext";

const login = () => {
  const { user } = useAuthContext();

  if (user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-[20px] py-16 md:px-14">
        <Logo />

        <LoginForm />

        <Footer />
      </div>
      <NeedHelpFAB />
    </main>
  );
};

const Footer = () => {
  return (
    <>
      <div className="text-white">
        <span className="label-lg">New to RAC Logistics? </span>
        <Link
          href="/register"
          className="label-lg px-[12px] py-[10px] text-primary-200 hover:underline"
        >
          Sign up
        </Link>
      </div>
      <Link
        href="/password-reset"
        className="label-lg relative px-[12px] py-[10px] text-primary-200 hover:underline"
      >
        Forgot your password?
      </Link>
    </>
  );
};

export default login;
