import { ArrowCircleDown2, ArrowCircleRight2 } from "iconsax-react";
import LabelId from "./LabelId";

type OrderTrackingIdProps = { orderId: string; trackingId: string };

const OrderTrackingId = ({ orderId, trackingId }: OrderTrackingIdProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[10px] md:flex-row">
      <div className="flex items-center gap-[10px]">
        <LabelId label="Order ID" id={orderId} />
        <ArrowCircleDown2 variant="Bold" className="text-gray-500 md:hidden" />
      </div>
      <ArrowCircleRight2
        variant="Bold"
        className="hidden text-gray-500 md:block"
      />
      <LabelId label="Tracking ID" id={trackingId} />
    </div>
  );
};

export default OrderTrackingId;
