import { Wallet } from "iconsax-react";

type PayNowButtonProps = { onClick: () => void };

export const PayNowButton = ({ onClick }: PayNowButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Pay Now"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-error-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Wallet size={18} variant="Bold" />
      <span className="body-lg text-white">Pay Now</span>
    </button>
  );
};
