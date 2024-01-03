import { BackButton } from "~/components/Buttons/BackButton";
import { shippingStatuses } from "~/components/Import/Orders/OrderDetails";
import OrderTrackingId from "~/components/OrderTrackingId";
import { type SHIPPING_STATUS, type SHOP_FOR_ME_STATUS } from "~/constants";
import { useShopContext } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import {
  ArrivedOriginWarehouseStatus,
  DetailsClearPackageButton,
  DetailsClearedButton,
  DetailsDeliveredButton,
  DetailsInitiateShippingButton,
  NotArrivedOriginWarehouseStatus,
  ProcessedStatus,
  SortedOutStatus,
} from ".";
import AccordionButton from "../../Forms/AccordionButton";
import {
  BillingDetails,
  Item,
  PackageOrigin,
} from "../Requests/RequestDetails";
import {
  RequestFormHeader,
  SectionContentLayout,
  SectionHeader,
} from "../Requests/RequestOrder";
import { DetailSection } from "./InitiateShipping";

const OrderDetails = () => {
  const { orderPackages } = useShopContext();
  const { viewIndex, handleActiveAction } = useTabContext();

  if (viewIndex === null) return;

  const orderPackage = orderPackages?.[viewIndex];

  if (!orderPackage) return;

  const handleBack = () => {
    handleActiveAction(null);
  };

  return (
    <div className="flex max-w-[1032px] flex-col gap-[30px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <RequestFormHeader title="Shop For Me Order Details" />
      <div className="w-full md:w-max">
        <OrderTrackingId
          orderId={orderPackage.orderId}
          trackingId={orderPackage.trackingId}
        />
      </div>
      <OrderInformation
        info={{
          date: orderPackage.orderLocalDate.toLocaleString(),
          shopForMeStatus: orderPackage.shopForMeStatus,
          shippingStatus: orderPackage.shippingStatus,
        }}
      />
      <div className="flex flex-col gap-[10px]">
        <PackageOrigin />
        <hr className="block w-full border-dashed border-primary-900" />
        {orderPackages.map((item, i) => {
          return <Item key={item.orderId} index={i} />;
        })}
      </div>
      <BillingDetails />
      <div className="w-max">
        <BackButton onClick={handleBack} />
      </div>
    </div>
  );
};

type OrderInformationProps = {
  info: {
    date: string;
    shopForMeStatus: (typeof SHOP_FOR_ME_STATUS)[number];
    shippingStatus: (typeof SHIPPING_STATUS)[number];
  };
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
                  label="Shop For Me Status"
                  value={shopForMeStatuses[info.shopForMeStatus]}
                />
              </div>
              <div className="md:col-span-2">
                <DetailSection
                  label="Shipping Status"
                  value={shippingStatuses[info.shippingStatus]}
                />
              </div>
              <div className="flex w-max items-center md:col-span-4">
                {info.shippingStatus === "ready for shipping" && (
                  <DetailsInitiateShippingButton />
                )}
                {info.shippingStatus === "arrived destination" && (
                  <DetailsClearPackageButton />
                )}
                {info.shippingStatus === "cleared" && <DetailsClearedButton />}
                {info.shippingStatus === "delivered" && (
                  <DetailsDeliveredButton />
                )}
              </div>
            </div>
          )}
        </div>
      </SectionContentLayout>
    </div>
  );
};

export const shopForMeStatuses = {
  "Purchase in progress": <ArrivedOriginWarehouseStatus />,
  "Purchase not started": <NotArrivedOriginWarehouseStatus />,
  "Purchase completed": <SortedOutStatus />,
};

export default OrderDetails;
