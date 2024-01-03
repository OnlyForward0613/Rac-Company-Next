import { ArrowLeft, Home2 } from "iconsax-react";
import { useNavContext } from "~/contexts/NavigationContext";
import { useTabContext } from "~/contexts/TabContext";

const BreadCrumbs = () => {
  const { activeNav } = useNavContext();
  const { activeTab, customText } = useTabContext();

  return (
    <div className="flex w-full items-center justify-center gap-[10px] px-[20px] md:gap-4 md:px-0">
      <Home2 size="19" className="flex-shrink-0 text-secondary-600" />
      <ArrowLeft
        size={10}
        color="#292D32"
        variant="Outline"
        className="flex-shrink-0"
      />
      <span className="title-sm flex items-center text-secondary-600">
        {activeNav.toLowerCase()}
        {activeTab && <> - {activeTab}</>}
      </span>

      {customText && (
        <>
          <ArrowLeft
            size={10}
            color="#292D32"
            variant="Outline"
            className="flex-shrink-0"
          />
          <span className="title-sm overflow-hidden text-ellipsis whitespace-nowrap text-secondary-600">
            {customText}
          </span>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
