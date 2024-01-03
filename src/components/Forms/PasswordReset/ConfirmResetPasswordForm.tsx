import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ConfirmResetPasswordForm = () => {
  const { handleConfirmPasswordReset } = useAuthContext();
  const formMethods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.password);
    handleConfirmPasswordReset(data.password);
  };

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
          <PasswordInput
            id="password"
            label="Password"
            newPassword
            {...formMethods.register("password")}
            // disabled={isAuthenticating || isFetchingUser}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            confirmPassword
            {...formMethods.register("confirmPassword")}
            // disabled={isAuthenticating || isFetchingUser}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <ConfirmResetButton
            disabled={false}
            onClick={formMethods.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </FormProvider>
  );
};

type ConfirmResetButtonProps = { disabled: boolean; onClick: () => void };

const ConfirmResetButton = ({ disabled, onClick }: ConfirmResetButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      {disabled ? <LoadingSpinner /> : "Confirm"}
    </button>
  );
};

export default ConfirmResetPasswordForm;
