import { City, State } from "country-state-city";
import { useEffect, useMemo } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormGetValues,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

type UseStatesCitiesType<T extends FieldValues> = {
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
};

type LocationInputs = {
  country: string;
  state: string;
  city: string;
};

const useStatesCities = <T extends LocationInputs>({
  getValues,
  setValue,
  watch,
}: UseStatesCitiesType<T>) => {
  const states = useMemo(
    () => State.getStatesOfCountry(getValues("country" as Path<T>)),
    [watch("country" as Path<T>)],
  );
  const cities = useMemo(
    () =>
      City.getCitiesOfState(
        getValues("country" as Path<T>),
        getValues("state" as Path<T>),
      ),
    [watch("country" as Path<T>), watch("state" as Path<T>)],
  );

  useEffect(() => {
    setValue("state" as Path<T>, "" as PathValue<T, Path<T>>);
  }, [states]);

  return { states, cities };
};

export default useStatesCities;
