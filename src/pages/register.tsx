import dynamic from "next/dynamic";
import Link from "next/link";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { BackButton } from "~/components/Buttons/BackButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { ProceedButton } from "~/components/Buttons/ProceedButton";
import { LoadingSpinner } from "~/components/LoadingScreen";
import Logo from "~/components/Logo";
import { useAuthContext } from "~/contexts/AuthContext";
import useMultiStepForm from "~/hooks/useMultistepForm";

const AccountForm = dynamic(
  () => import("~/components/Forms/Register/AccountForm"),
);
const AddressForm = dynamic(
  () => import("~/components/Forms/Register/AddressForm"),
);

export type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  countryCode: string;
  phoneNumber: string;
  zipPostalCode: string;
};

const INITIAL_DATA: RegisterInputs = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "",
  state: "",
  city: "",
  streetAddress: "",
  countryCode: "",
  phoneNumber: "",
  zipPostalCode: "",
};

const register = () => {
  const { user, isRegistering, registerError, handleRegister } =
    useAuthContext();

  if (user) return null;

  const formMethods = useForm<RegisterInputs>({
    defaultValues: INITIAL_DATA,
  });
  const { step, next, isFirstStep, back, isLastStep } = useMultiStepForm([
    <AccountForm />,
    <AddressForm />,
  ]);
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (!isLastStep) return next();

    const registerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      country: data.country,
      countryCode: data.countryCode,
      contactAddress: [
        {
          country: data.country,
          state: data.state,
          city: data.city,
          streetAddress: data.streetAddress,
          countryCode: data.countryCode,
          phoneNumber: data.phoneNumber,
          postalCode: data.zipPostalCode,
        },
      ],
    };

    await handleRegister(registerData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-[20px] py-16 md:px-14">
        <Logo />

        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="mb-[30px] mt-[100px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
          >
            {step}

            {registerError && (
              <span className="text-error-600">{registerError}</span>
            )}
            <div className="flex gap-4">
              {!isRegistering && !isFirstStep && (
                <div className="w-full md:w-max">
                  <BackButton onClick={back} />
                </div>
              )}
              {!isLastStep && <ProceedButton onClick={next} />}
              {isLastStep && (
                <CreateAccountButton
                  onClick={formMethods.handleSubmit(onSubmit)}
                  disabled={isRegistering}
                />
              )}
            </div>
            {isLastStep && <TermsAndCondition />}
          </form>
        </FormProvider>

        <div className="text-white">
          <span className="label-lg">Already have an account?</span>
          <Link
            href="/login"
            className="label-lg px-[12px] py-[10px] text-primary-200 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
      <NeedHelpFAB />
    </main>
  );
};

type CreateAccountButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const CreateAccountButton = ({
  onClick,
  disabled,
}: CreateAccountButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className="btn relative flex h-[40px] flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      {disabled ? <LoadingSpinner /> : "Create My Account"}
    </button>
  );
};

const TermsAndCondition = () => {
  return (
    <div className="body-md text-center text-black">
      <Balancer>
        You accept the privacy statement of RAC&nbsp;Logistics by clicking the{" "}
        <span className="label-lg text-primary-600">Create My Account </span>
        button
      </Balancer>
    </div>
  );
};

export default register;
