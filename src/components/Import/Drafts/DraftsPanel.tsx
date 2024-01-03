/* eslint-disable @next/next/no-img-element */
import Balancer from "react-wrap-balancer";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import RequestOrderButton from "~/components/Buttons/RequestOrderButton";
import { useImportContext } from "~/contexts/ImportContext";
import DraftDetails from "./DraftDetails";

const ImportDraftsPanel = () => {
  const { draftItems } = useImportContext();

  if (Array.isArray(draftItems) && draftItems.length > 0) {
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
            You don&apos;t have any import request in your draft folder yet,
            would you like to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

export default ImportDraftsPanel;
