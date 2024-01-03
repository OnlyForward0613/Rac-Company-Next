import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import {
  forwardRef,
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
  type Ref,
} from "react";

type PasswordInputProps = {
  id: string;
  label: string;
  confirmPassword?: boolean;
  newPassword?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const PasswordInput = (
  {
    id,
    label,
    confirmPassword = false,
    newPassword = false,
    ...props
  }: PasswordInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col gap-[10px]">
      <div className="relative z-0">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          aria-label={label}
          name={id}
          id={id}
          className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 py-2 pl-4 pr-14 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
          placeholder=" "
          {...props}
        />

        <label
          htmlFor={id}
          className="absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:bg-neutral-10 peer-focus:text-primary-600"
        >
          {label}
        </label>

        <button
          className="absolute right-4 top-4 z-10"
          type="button"
          onClick={toggleVisibility}
        >
          {show ? (
            <Eye variant="Bold" className="text-gray-700" />
          ) : (
            <EyeSlash variant="Bold" className="text-gray-700" />
          )}
        </button>
      </div>
      {newPassword && (
        <div className="grid grid-cols-1 gap-[10px] px-[10px] md:grid-cols-2">
          <SupportingText text="At least one lowercase letter" />
          <SupportingText text="Minimum of 8 characters" />
          <SupportingText text="At least one uppercase character" />
          <SupportingText text="Must contain a number or special character" />
        </div>
      )}

      {confirmPassword && (
        <div className="px-[10px]">
          <SupportingText text="Passwords match each other" />
        </div>
      )}
    </div>
  );
};

type SupportingTextProps = { text: string };

const SupportingText = ({ text }: SupportingTextProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <TickCircle
        size={18}
        variant="Bold"
        className="flex-shrink-0 text-gray-500"
      />
      <span className="body-sm text-gray-700">{text} </span>
    </div>
  );
};

export default forwardRef(PasswordInput);
