import { ArrowCircleLeft2 } from "iconsax-react";

type PrimaryBackButtonProps = { text?: string; onClick: () => void };

export const PrimaryBackButton = ({
  text = "Back",
  onClick,
}: PrimaryBackButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ArrowCircleLeft2 size={18} variant="Bold" />
      <span className="label-lg text-white">{text}</span>
    </button>
  );
};
