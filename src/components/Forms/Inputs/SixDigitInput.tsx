import { forwardRef, type Ref } from "react";
import TextInput from "./TextInput";

const SixDigitInput = ({ ...props }, ref: Ref<HTMLInputElement>) => {
  return (
    <TextInput
      id="sixDigit"
      label="Six Digit Code"
      maxLength={6}
      minLength={6}
      pattern="[0-9]{1,6}"
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(SixDigitInput);
