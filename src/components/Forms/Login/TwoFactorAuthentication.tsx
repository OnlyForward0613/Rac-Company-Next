import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import SixDigitInput from "../Inputs/SixDigitInput";

type Inputs = {
  sixDigitCode: string;
};

const TwoFactorAuthentication = () => {
  const { authType, handleCodeVerification } = useAuthContext();
  const formMethods = useForm<Inputs>();
  const isTOTP = authType === "TOTP";
  const isEmail = authType === "email";

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.sixDigitCode);
    handleCodeVerification(data.sixDigitCode);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="mb-[30px] mt-[100px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        <FormHeader
          title="Two-Factor Authentication"
          subTitle={
            isTOTP
              ? "Access your selected authenticator app and enter the 6-digit code to finish the login procedure."
              : isEmail
                ? "A distinct code has been sent to your email address. Enter the code to finish the login procedure."
                : ""
          }
        />
        <div className="flex w-full flex-col gap-[30px]">
          <SixDigitInput
            {...formMethods.register("sixDigitCode")}
            // disabled={isAuthenticating || isFetchingUser}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <VerifyButton
            disabled={false}
            onClick={formMethods.handleSubmit(onSubmit)}
          />
        </div>
        {isEmail && (
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <div className="body-md text-center text-black">
              Didn't see the code?{" "}
              <button className="label-lg text-primary-600">Resend Code</button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

type VerifyButtonProps = { disabled: boolean; onClick: () => void };

const VerifyButton = ({ disabled, onClick }: VerifyButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      {disabled ? <LoadingSpinner /> : "Verify"}
    </button>
  );
};

export default TwoFactorAuthentication;
