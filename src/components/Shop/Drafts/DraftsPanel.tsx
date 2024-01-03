/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { useShopContext } from "~/contexts/ShopContext";
import RequestOrderButton from "../../Buttons/RequestOrderButton";
import TabContentLayout from "../../Layouts/TabContentLayout";
import DraftDetails from "./DraftDetails";

const ShopDraftsPanel = () => {
  const { draftPackages } = useShopContext();

  if (Array.isArray(draftPackages) && draftPackages.length > 0) {
    return (
      <TabContentLayout>
        <DraftDetails />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You don&apos;t have any shop for me request in your draft folder
            yet, would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default ShopDraftsPanel;
