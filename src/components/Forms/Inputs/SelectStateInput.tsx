import { type IState } from "country-state-city";
import { forwardRef, type Ref } from "react";
import SelectInput from "./SelectInput";

type SelectStateProps = {
  states: IState[];
};

const SelectStateInput = (
  { states, ...props }: SelectStateProps,
  ref: Ref<HTMLSelectElement>,
) => {
  return (
    <SelectInput
      ref={ref}
      id="state"
      label="State"
      options={
        <>
          <option value="" disabled hidden>
            Enter your state
          </option>
          {states.map(({ name, isoCode }) => {
            return (
              <option key={`state-${name}`} value={isoCode}>
                {name}
              </option>
            );
          })}
        </>
      }
      {...props}
    />
  );
};

export default forwardRef(SelectStateInput);
