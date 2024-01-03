import { BackButton } from "~/components/Buttons/BackButton";
import { OrderItem } from "~/components/Import/Orders/ClearPackage";
import {
  OrderInformation,
  PackageOrigin,
} from "~/components/Import/Requests/RequestDetails";
import LabelId from "~/components/LabelId";
import { InitiateShippingButton } from "~/components/Shop/Orders/InitiateShipping";
import { RequestFormHeader } from "~/components/Shop/Requests/RequestOrder";
import { useExportContext } from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";

const RequestDetails = () => {
  const { requestPackages } = useExportContext();
  const { viewIndex, handleActiveAction, handleTabChange } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const status = requestPackage.requestStatus ?? "Not Responded";

  const handleBack = () => {
    handleActiveAction(null);
  };

  const handleProceed = () => {
    handleTabChange("orders");
    handleActiveAction("initiate shipping");
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Export Order Request Details" />
      <LabelId label="Request ID" id={requestPackage.requestId} />
      <OrderInformation
        info={{
          date: requestPackage.requestLocalDate.toLocaleString(),
          status,
        }}
        onClick={handleProceed}
      />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {requestPackage.items.map((item, i) => {
          return <OrderItem key={i} index={i} />;
        })}
      </div>
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
        {status === "Responded" && (
          <InitiateShippingButton onClick={handleProceed} />
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
