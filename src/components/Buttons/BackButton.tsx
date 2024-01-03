import { ArrowCircleLeft2 } from "iconsax-react";

type BackButtonProps = { onClick: () => void };

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ArrowCircleLeft2 size={18} variant="Bold" className="text-primary-600" />
      <span className="body-lg text-primary-600">Back</span>
    </button>
  );
};
