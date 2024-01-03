import { SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";

type SearchInputProps = {
  id: string;
  label: string;
  bg?: string;
  initialValue?: string;
  onChange: (value: string) => void;
};

const DebounceSearchInput = ({
  id,
  label,
  bg = "bg-neutral-50",
  initialValue = "",
  onChange,
}: SearchInputProps) => {
  const debounceTime = 500;
  const [debounceValue, setDebounceValue] = useState(initialValue);

  // setValue if any initialValue changes
  useEffect(() => {
    setDebounceValue(initialValue);
  }, [initialValue]);

  // debounce onChange — triggered on every keypress
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(debounceValue);
    }, debounceTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [debounceValue, onChange, debounceTime]);

  return (
    <div className="relative flex w-full">
      <div className="relative z-0 w-full">
        <div className="absolute left-4 top-4 z-10">
          <SearchNormal1
            className="text-gray-500"
            size="24"
            variant="Outline"
          />
        </div>

        <input
          type="search"
          aria-label="search"
          name={id}
          id={id}
          className={`peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-transparent py-2 pl-14 pr-4 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0 lg:min-w-[410px] ${bg}`}
          placeholder=" "
          value={debounceValue}
          onChange={(e) => setDebounceValue(e.target.value)}
        />

        <label
          htmlFor={id}
          className={`absolute left-12 top-4 z-10 w-max origin-[0] -translate-y-7 scale-75 transform whitespace-nowrap px-1 tracking-[.03125em] text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-12 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:px-1 peer-focus:text-primary-600  ${`peer-focus:${bg}`} ${bg}`}
        >
          {label}
        </label>
      </div>
      <div className="hidden px-4 pt-1 text-xs tracking-[0.4px]">
        Supporting text
      </div>
    </div>
  );
};

export default DebounceSearchInput;
