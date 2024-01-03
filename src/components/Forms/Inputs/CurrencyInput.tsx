import { DollarSquare } from "iconsax-react";
import { type Ref, forwardRef, type ChangeEventHandler } from "react";

type CurrencyInputProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const CurrencyInput = (
  { id, label, ...props }: CurrencyInputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <div className="relative flex w-full flex-col">
      <div className="relative z-0">
        <div className="absolute left-2 top-2 z-10">
          <button
            className="btn relative flex items-center justify-center rounded-[6.25rem] bg-primary-100 p-[8px]"
            type="button"
          >
            <DollarSquare size={24} color="#292d32" variant="Outline" />
          </button>
        </div>

        <input
          ref={ref}
          type="number"
          step="0.01"
          aria-label={label}
          name={id}
          id={id}
          className="peer relative block h-14 w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 py-2 pl-14 pr-4 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0"
          placeholder=" "
          {...props}
        />

        <label
          htmlFor={id}
          className="absolute left-14 top-4 z-10 max-w-[170px] origin-[0] -translate-y-7 scale-75 transform overflow-hidden whitespace-nowrap bg-neutral-10 px-1 tracking-[.03125em] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-invalid:text-error-600 peer-focus:left-4 peer-focus:w-max peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:overflow-visible peer-focus:bg-neutral-10 peer-focus:text-primary-600 min-[500px]:max-w-[500px] sm:w-max"
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

export default forwardRef(CurrencyInput);
