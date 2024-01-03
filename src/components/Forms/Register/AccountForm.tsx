import { useFormContext } from "react-hook-form";
import { useAuthContext } from "~/contexts/AuthContext";
import { type RegisterInputs } from "~/pages/register";
import FormHeader from "../FormHeader";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";

const AccountForm = () => {
  const { isRegistering } = useAuthContext();
  const { register } = useFormContext<RegisterInputs>();

  return (
    <>
      <FormHeader title="Create your account" />
      <div className="flex w-full flex-col gap-[30px]">
        <TextInput
          id={"firstName"}
          label={"First Name"}
          disabled={isRegistering}
          {...register("firstName")}
        />
        <TextInput
          id={"lastName"}
          label={"Last Name"}
          disabled={isRegistering}
          {...register("lastName")}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          disabled={isRegistering}
          {...register("email")}
        />
        <PasswordInput
          id="password"
          label="Password"
          disabled={isRegistering}
          newPassword
          {...register("password")}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          disabled={isRegistering}
          confirmPassword
          {...register("confirmPassword")}
        />
      </div>
    </>
  );
};

export default AccountForm;
