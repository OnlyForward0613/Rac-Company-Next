import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import ConfirmResetPasswordForm from "~/components/Forms/PasswordReset/ConfirmResetPasswordForm";
import RequestPasswordResetForm from "~/components/Forms/PasswordReset/RequestPasswordResetForm";
import LoadingScreen from "~/components/LoadingScreen";
import Logo from "~/components/Logo";
import { useAuthContext } from "~/contexts/AuthContext";

const passwordReset = () => {
  const [isResetCodeVerified, setIsResetCodeVerified] = useState(false); // todo: convert to useQuery and get data from server instead
  const { user, handleVerifyPasswordResetCode } = useAuthContext(); // todo: move to useVerifyPasswordResetCode hook

  if (user) return null;

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const result = handleVerifyPasswordResetCode(code);
      setIsResetCodeVerified(result);
    }
  }, [code]);

  // todo: change condition !isResetCodeVerified to isVerifyingCode (loading state)
  if (code && !isResetCodeVerified) {
    return <LoadingScreen />;
  }

  // todo: add error state
  // if (code && !isResetCodeVerified) {return <>Invalid Reset Code</>}

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-[20px] py-16 md:px-14">
        <Logo />

        {isResetCodeVerified ? (
          <ConfirmResetPasswordForm />
        ) : (
          <RequestPasswordResetForm />
        )}
      </div>
      <NeedHelpFAB />
    </main>
  );
};

export default passwordReset;
