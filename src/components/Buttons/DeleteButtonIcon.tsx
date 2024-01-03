import { Bag } from "iconsax-react";

type DeleteButtonIconProps = {
  onClick: () => void;
};

export const DeleteButtonIcon = ({ onClick }: DeleteButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Delete"
      className="btn relative flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      <Bag variant="Bold" className="text-error-600" />
    </button>
  );
};
