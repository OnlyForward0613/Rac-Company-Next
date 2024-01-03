import {
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
  type HTMLInputTypeAttribute,
  type Ref,
} from "react";

type TextInputProps = {
  id: string;
  label: string;
  bg?: string;
  defaultValue?: string;
  disabled?: boolean;
  max?: string | number;
  maxLength?: number;
  min?: string | number;
  minLength?: number;
  pattern?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const TextInput = (
  { id, label, bg = "bg-neutral-10", type = "text", ...props }: TextInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <div className="relative flex w-full flex-col">
      <input
        ref={ref}
        type={type}
        aria-label={label}
        name={id}
        id={id}
        className={`peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0 ${bg}`}
        placeholder=" "
        {...props}
      />

      <label
        htmlFor={id}
        className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-7 scale-75 transform px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:px-1 peer-focus:text-primary-600 ${`peer-focus:${bg}`} ${bg}`}
      >
        {label}
      </label>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default forwardRef(TextInput);
