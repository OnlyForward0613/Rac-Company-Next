import { SaveAdd } from "iconsax-react";
import { useTabContext } from "~/contexts/TabContext";

export const SaveAsDraftButton = () => {
  const { handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("drafts");
  };

  return (
    <button
      onClick={onClick}
      aria-label="Save as Draft"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-secondary-100 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <SaveAdd size={18} variant="Bold" className="text-primary-600" />
      <span className="body-lg text-secondary-900">Save as Draft</span>
    </button>
  );
};
