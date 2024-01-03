import { type ICity } from "country-state-city";
import { forwardRef, type Ref } from "react";
import SelectInput from "./SelectInput";

type SelectCityProps = {
  cities: ICity[];
};

const SelectCityInput = (
  { cities, ...props }: SelectCityProps,
  ref: Ref<HTMLSelectElement>,
) => {
  return (
    <SelectInput
      ref={ref}
      id="city"
      label="City"
      options={
        <>
          <option value="" disabled hidden>
            Enter your city
          </option>
          {cities.map(({ name }) => {
            return (
              <option key={`city-${name}`} value={name}>
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

export default forwardRef(SelectCityInput);
