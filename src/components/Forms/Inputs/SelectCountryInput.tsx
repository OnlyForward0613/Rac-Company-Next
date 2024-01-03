import { Country } from "country-state-city";
import { forwardRef, type Ref } from "react";
import SelectInput from "./SelectInput";

const SelectCountryInput = ({ ...props }, ref: Ref<HTMLSelectElement>) => {
  return (
    <SelectInput
      ref={ref}
      id="country"
      label="Country"
      options={
        <>
          <option value="" disabled hidden>
            Enter your country
          </option>
          {Country.getAllCountries().map(({ name, isoCode }) => {
            return (
              <option key={`country-${name}`} value={isoCode}>
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

export default forwardRef(SelectCountryInput);
