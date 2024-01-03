import { TickCircle } from "iconsax-react";

type DoneButtonProps = { handleFinish: () => void };

export const DoneButton = ({ handleFinish }: DoneButtonProps) => {
  return (
    <button
      onClick={handleFinish}
      aria-label="Done"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <TickCircle size={18} variant="Bold" />
      <span className="body-lg text-white">Done</span>
    </button>
  );
};
