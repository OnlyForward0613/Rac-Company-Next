import { DestinationAddressDetails } from "~/components/AutoImport/Requests/RequestOrder";
import { BackButton } from "~/components/Buttons/BackButton";
import AccordionButton from "~/components/Forms/AccordionButton";
import { OrderItem } from "~/components/Import/Orders/ClearPackage";
import {
  shippingStatuses,
  type OrderInformationProps,
} from "~/components/Import/Orders/OrderDetails";
import { PackageOrigin } from "~/components/Import/Requests/RequestDetails";
import OrderTrackingId from "~/components/OrderTrackingId";
import {
  DetailsClearedButton,
  DetailsDeliveredButton,
  DetailsInitiateShippingButton,
  ProcessedStatus,
} from "~/components/Shop/Orders";
import {
  DefaultBillingAddress,
  DetailSection,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { useExportContext } from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";

const OrderDetails = () => {
  const { orderPackages } = useExportContext();
  const { viewIndex, handleActiveAction } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Export Order Details" />
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
      <DestinationAddressDetails />
      <SectionHeader title="Billing details" />
      <DefaultBillingAddress />
      <PaymentsInformation />
      <div className="flex w-max gap-[10px] whitespace-nowrap">
        <BackButton onClick={handleBack} />
      </div>
    </div>
  );
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

export default OrderDetails;
