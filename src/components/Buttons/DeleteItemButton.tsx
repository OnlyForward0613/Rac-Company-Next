import { Bag } from "iconsax-react";

type DeleteItemButtonProps = {
  onClick: () => void;
};

export const DeleteItemButton = ({ onClick }: DeleteItemButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Delete Item"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 bg-white px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-error-600 md:px-6"
    >
      <Bag size={18} variant="Bold" className="text-error-600" />
      <span>Delete Item</span>
    </button>
  );
};
