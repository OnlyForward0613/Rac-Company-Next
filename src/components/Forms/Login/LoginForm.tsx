/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";

export type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    authType,
    loginError,
    isAuthenticating,
    isFetchingUser,
    user,
    handleLogin,
    setAuthType,
  } = useAuthContext();
  const formMethods = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    handleLogin(data);
  };

  if (user) return null;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="mb-[30px] mt-[100px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]"
      >
        <FormHeader
          title="Login"
          subTitle={
            <div className="flex flex-col items-center justify-center gap-[10px]">
              Two Factor Authentication (for testing):
              <div className="flex items-center justify-center gap-[10px]">
                <input
                  type="radio"
                  name="authType"
                  id="1"
                  className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
                  onChange={() => setAuthType(null)}
                  checked={authType === null}
                  disabled={isAuthenticating || isFetchingUser}
                />
                None
                <input
                  type="radio"
                  name="authType"
                  id="2"
                  className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
                  onChange={() => setAuthType("email")}
                  checked={authType === "email"}
                  disabled={isAuthenticating || isFetchingUser}
                />
                Email
                <input
                  type="radio"
                  name="authType"
                  id="3"
                  className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600 ltr:mr-3 rtl:ml-3"
                  onChange={() => setAuthType("TOTP")}
                  checked={authType === "TOTP"}
                  disabled={isAuthenticating || isFetchingUser}
                />
                TOTP
              </div>
            </div>
          }
        />
        <div className="flex w-full flex-col gap-[30px]">
          <TextInput
            id="email"
            label="Email"
            type="email"
            disabled={isAuthenticating || isFetchingUser}
            {...formMethods.register("email")}
          />
          <PasswordInput
            id="password"
            label="Password"
            disabled={isAuthenticating || isFetchingUser}
            {...formMethods.register("password")}
          />
        </div>
        {loginError?.response && (
          <span className="text-error-500">
            {loginError.response.status === 401 &&
              "Email or Password is incorrect"}
          </span>
        )}
        <LoginButton
          disabled={isAuthenticating || isFetchingUser}
          onClick={formMethods.handleSubmit(onSubmit)}
        />
      </form>
    </FormProvider>
  );
};

type LoginButtonProps = { disabled: boolean; onClick: () => void };

const LoginButton = ({ disabled, onClick }: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn relative flex h-[40px] flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-6 py-2.5 text-sm font-medium tracking-[.00714em] text-white hover:shadow-md"
    >
      {disabled ? <LoadingSpinner /> : "Login to your account"}
    </button>
  );
};

export default LoginForm;
