import { ArrowCircleDown, ArrowCircleUp } from "iconsax-react";

type AccordionButtonProps = { open: boolean; toggle: () => void };

const AccordionButton = ({ open, toggle }: AccordionButtonProps) => {
  return (
    <button
      type="button"
      aria-label={open ? "collapse" : "expand"}
      onClick={toggle}
      className="flex h-[24px] w-[24px] items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      {open ? (
        <ArrowCircleUp color="#292D32" variant="Outline" />
      ) : (
        <ArrowCircleDown color="#292D32" variant="Outline" />
      )}
    </button>
  );
};

export default AccordionButton;
