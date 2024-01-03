import { type CloseModalButtonProps } from "~/components/Buttons/CloseModalButton";

export const CancelButton = ({ dataClose, onClick }: CloseModalButtonProps) => {
  return (
    <button
      type="button"
      aria-label="Cancel"
      onClick={onClick}
      data-close={dataClose}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600 md:px-6"
    >
      <span className="label-lg">Cancel</span>
    </button>
  );
};
