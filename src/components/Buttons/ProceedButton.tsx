import { ArrowCircleRight2 } from "iconsax-react";

export type ProceedButtonProps = { label?: string; onClick: () => void };

export const ProceedButton = ({
  label = "Proceed",
  onClick,
}: ProceedButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ArrowCircleRight2 size={18} variant="Bold" />
      <span className="body-lg text-white">{label}</span>
    </button>
  );
};
