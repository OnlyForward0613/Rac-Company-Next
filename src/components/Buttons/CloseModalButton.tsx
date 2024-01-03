import { CloseCircle } from "iconsax-react";

export type CloseModalButtonProps = { dataClose: string; onClick?: () => void };

export const CloseModalButton = ({
  dataClose,
  onClick,
}: CloseModalButtonProps) => {
  return (
    <button
      aria-label="Close"
      onClick={onClick}
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <CloseCircle size="18" variant="Bold" />
      <span className="label-lg text-white">Close</span>
    </button>
  );
};
