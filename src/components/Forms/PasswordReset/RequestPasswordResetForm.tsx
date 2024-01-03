import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import TextInput from "../Inputs/TextInput";

type Inputs = {
  email: string;
};

const RequestPasswordResetForm = () => {
  const [isEmailSent, setIsEmailSent] = useState(false); // todo: convert to useQuery and get data from server instead
  const { handleSendResetEmail } = useAuthContext(); // todo: move to useVerifyEmail hook
  const formMethods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.email);
    const result = handleSendResetEmail(data.email);
    setIsEmailSent(result);
  };

  if (isEmailSent) {
    return (
      <div className="mb-[30px] mt-[100px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <div className="label-lg w-full rounded-[20px] bg-primary-200 p-[10px] text-center font-medium text-gray-700">
          We have just sent the password reset link to your email.
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="mb-[30px] mt-[100px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        <FormHeader
          title="Reset your password"
          subTitle="We will send you a password reset link if we find the email you provide associated to an existing account."
        />
        <div className="flex w-full flex-col gap-[30px]">
          <TextInput
            type="email"
            id="email"
            label="Email"
            {...formMethods.register("email")}
            // disabled={isAuthenticating || isFetchingUser}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <SendResetEmailButton
            disabled={false}
            onClick={formMethods.handleSubmit(onSubmit)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <div className="body-md text-center text-black">
            Changed your mind?{" "}
            <Link href="/login" className="label-lg text-primary-600">
              Back to login page
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

type SendResetEmailButtonProps = { disabled: boolean; onClick: () => void };

const SendResetEmailButton = ({
  disabled,
  onClick,
}: SendResetEmailButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      {disabled ? <LoadingSpinner /> : "Send Reset Email"}
    </button>
  );
};

export default RequestPasswordResetForm;
