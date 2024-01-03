import { BackButton } from "~/components/Buttons/BackButton";
import AccordionButton from "~/components/Forms/AccordionButton";
import LabelId from "~/components/LabelId";
import { DetailsInitiateShippingButton } from "~/components/Shop/Orders";
import {
  DefaultBillingAddress,
  DetailSection,
  InitiateShippingButton,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  requestStatuses,
  type RequestInformationProps,
} from "~/components/Shop/Requests/RequestDetails";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useAutoImportContext } from "~/contexts/AutoImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import { OrderItem } from "../Orders/InitiateShipping";
import {
  DestinationAddressDetails,
  OriginWarehouseAddress,
} from "./RequestOrder";

const RequestDetails = () => {
  const { requestPackages } = useAutoImportContext();
  const { viewIndex, handleActiveAction } = useTabContext();

  if (viewIndex === null) return;

  const requestPackage = requestPackages?.[viewIndex];

  if (!requestPackage) return;

  const status = requestPackage.requestStatus ?? "Not Responded";

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Auto Import Order Request Details" />
      <LabelId label="Request ID" id={requestPackage.requestId} />
      <OrderInformation
        info={{
          date: requestPackage.requestLocalDate.toLocaleString(),
          status,
        }}
      />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {requestPackage.items.map((item, i) => {
          return <OrderItem key={i} index={i} />;
        })}
      </div>
      <SectionHeader title="Shipping Details" />
      <DestinationAddressDetails />
      <SectionHeader title="Billing Details" />
      <DefaultBillingAddress />
      <PaymentsInformation />
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
        {status === "Responded" && <InitiateShippingButton />}
      </div>
    </div>
  );
};

export const PaymentsInformation = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <SectionContentLayout>
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-between">
          <h4 className="title-md md:title-lg text-gray-700">
            Payments Information
          </h4>
          <AccordionButton {...{ open, toggle }} />
        </div>
        {open && (
          <>
            <div className="flex flex-col gap-[10px]">
              <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-10">
                <DetailSection
                  label="Total Shipment Cost"
                  value="$234,000.00"
                  colSpanDesktop={4}
                />
                <DetailSection
                  label="Payment Status"
                  value="Unpaid"
                  colSpanDesktop={4}
                />
                <DetailSection
                  label="Total Clearing Cost:"
                  value="Not allocated yet"
                  colSpanDesktop={4}
                />
                <DetailSection
                  label="Payment Status"
                  value="Unpaid"
                  colSpanDesktop={4}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

const OrderInformation = ({ info }: RequestInformationProps) => {
  const { open, toggle } = useAccordion(true);

  return (
    <div className="flex flex-col gap-[10px]">
      <SectionHeader title="Order Information" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Order Information
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <div className="grid w-full grid-cols-1 gap-[15px] md:grid-cols-10">
              <div className="md:col-span-2">
                <DetailSection label="Order Request Date" value={info.date} />
              </div>
              <div className="md:col-span-2">
                <DetailSection
                  label="Request Status"
                  value={requestStatuses[info.status]}
                />
              </div>
              <div className="flex w-max items-center md:col-span-4">
                {info.status === "Responded" && (
                  <DetailsInitiateShippingButton />
                )}
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export const PackageOrigin = () => {
  const { open, toggle } = useAccordion(true);

  return (
    <>
      <SectionHeader title="Package Details" />
      <SectionContentLayout>
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full items-center justify-between">
            <h4 className="title-md md:title-lg text-gray-700">
              Package Origin
            </h4>
            <AccordionButton {...{ open, toggle }} />
          </div>
          {open && (
            <>
              <DetailSection
                label="Origin warehouse"
                value=" United States (Houston - warehouse)"
              />
              <OriginWarehouseAddress />
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

export default RequestDetails;
