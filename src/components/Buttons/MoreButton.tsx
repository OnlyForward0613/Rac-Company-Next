import { More } from "iconsax-react";

type MoreButtonProps = { onClick: () => void };

export const MoreButton = ({ onClick }: MoreButtonProps) => {
  return (
    <div className="group relative inline-block">
      <button className="peer flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400">
        <More className="text-error-600" />
      </button>

      <ul className="absolute right-0 top-10 z-50 hidden min-w-[200px] flex-col items-center justify-center rounded-[10px] bg-surface-200 shadow-md group-focus-within:inline-flex peer-focus:inline-flex">
        <li className="w-full">
          <button
            className="relative w-full rounded-[10px] px-4 py-2 hover:bg-secondary-100 hover:bg-opacity-30"
            onClick={onClick}
          >
            View Details
          </button>
        </li>
      </ul>
    </div>
  );
};
