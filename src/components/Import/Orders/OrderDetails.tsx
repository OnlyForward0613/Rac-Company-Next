import { BackButton } from "~/components/Buttons/BackButton";
import AccordionButton from "~/components/Forms/AccordionButton";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
  ArrivedClearStatus,
  ArrivedClearedDeliveredStatus,
  CancelledStatus,
  DetailsClearPackageButton,
  DetailsClearedButton,
  DetailsDeliveredButton,
  DetailsInitiateShippingButton,
  ProcessedStatus,
  ShipmentNotStartedStatus,
  ShipmentProcessingStatus,
} from "~/components/Shop/Orders";
import { DestinationShippingAddress } from "~/components/Shop/Orders/ClearPackage";
import {
  DefaultBillingAddress,
  DetailSection,
} from "~/components/Shop/Orders/InitiateShipping";
import { HighlightedInfo } from "~/components/Shop/Requests/RequestDetails";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { type SHIPPING_STATUS } from "~/constants";
import { useImportContext } from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import { OrderItem } from "./ClearPackage";

const OrderDetails = () => {
  const { orderPackages } = useImportContext();
  const { viewIndex, handleActiveAction } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Import Order Details" />
      <div className="w-full md:w-max">
        <OrderTrackingId
          orderId={orderPackage.orderId}
          trackingId={orderPackage.trackingId}
        />
      </div>
      <OrderInformation
        info={{
          date: orderPackage.orderLocalDate.toLocaleString(),
          status: orderPackage.shippingStatus,
        }}
      />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {orderPackage.items.map((item, i) => {
          return <OrderItem key={i} index={i} />;
        })}
      </div>
      <SectionHeader title="Shipping Details" />
      <DestinationShippingAddress />
      <SectionHeader title="Billing Details" />
      <DefaultBillingAddress />
      <PaymentsInformation />
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
      </div>
    </div>
  );
};

const PaymentsInformation = () => {
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
              <HighlightedInfo text="This Shipment Cost is subjected to increase to any Valid reason like delayed clearing and co. Also, you shall be paying the dollar equivalent in any of your chosen currency at the time of Clearing." />
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
              </div>
            </div>
          </>
        )}
      </div>
    </SectionContentLayout>
  );
};

const PackageOrigin = () => {
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
              <div className="flex flex-col gap-[5px]">
                <DetailSection
                  label="Origin warehouse"
                  value="Nigeria (Lagos - warehouse)"
                />
              </div>
            </>
          )}
        </div>
      </SectionContentLayout>
    </>
  );
};

export type OrderInformationProps = {
  info: { date: string; status: (typeof SHIPPING_STATUS)[number] };
};

const OrderInformation = ({ info }: OrderInformationProps) => {
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
                  label="Order Status"
                  value={<ProcessedStatus />}
                />
              </div>
              <div className="md:col-span-2">
                <DetailSection
                  label="Shipping Status"
                  value={shippingStatuses[info.status]}
                />
              </div>
              <div className="flex w-max items-center md:col-span-4">
                {info.status === "ready for shipping" && (
                  <DetailsInitiateShippingButton />
                )}
                {info.status === "arrived destination" && (
                  <DetailsClearPackageButton />
                )}
                {info.status === "cleared" && <DetailsClearedButton />}
                {info.status === "delivered" && <DetailsDeliveredButton />}
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export const shippingStatuses = {
  "ready for shipping": <ShipmentNotStartedStatus />,
  "not started": <ShipmentNotStartedStatus />,
  processing: <ShipmentProcessingStatus />,
  cancelled: <CancelledStatus />,
  "in transit": <ShipmentProcessingStatus />,
  "arrived destination": <ArrivedClearStatus />,
  cleared: <ArrivedClearedDeliveredStatus />,
  delivered: <ArrivedClearedDeliveredStatus />,
};

export default OrderDetails;
