import { ArrowLeft } from "iconsax-react";
import { navItems, useNavContext } from "~/contexts/NavigationContext";
import { useTabContext } from "~/contexts/TabContext";

const ReturnToButton = () => {
  const { activeNav } = useNavContext();
  const { handleActiveAction, handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("requests");
    handleActiveAction("request new order");
  };

  return (
    <button
      onClick={onClick}
      aria-label="Return To"
      className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <span className="[&>*]:text-white">
        <ArrowLeft />
      </span>
      <span>Return To</span>
    </button>
  );
};

export default ReturnToButton;
