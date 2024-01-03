import dayjs from "dayjs";
import { ExportCircle } from "iconsax-react";
import { useEffect } from "react";
import { type NOTIFICATION_TYPES } from "~/constants";
import { type AutoImportOrderPackageType } from "~/contexts/AutoImportContext";
import { type ExportOrderPackageType } from "~/contexts/ExportContext";
import { type ImportOrderPackageType } from "~/contexts/ImportContext";
import { useNavContext } from "~/contexts/NavigationContext";
import {
  useNotificationContext,
  type NotificationItemType,
} from "~/contexts/NotificationContext";
import { type ShopOrderPackageType } from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import useAccordion from "~/hooks/useAccordion";
import { PrimaryBackButton } from "~/components/Buttons/PrimaryBackButton";
import { DeleteItemButton } from "../Buttons/DeleteItemButton";
import { DeleteButtonIcon } from "../Buttons/DeleteButtonIcon";
import CongratulationImage from "../CongratulationImage";
import AccordionButton from "../Forms/AccordionButton";
import OrderTrackingId from "../OrderTrackingId";
import { StepDescription } from "../Shop/Orders/OrdersPanel";
import { AndLastly } from "../Shop/Requests/RequestCheckout";
import {
  SectionContentLayout,
  SectionHeader,
} from "../Shop/Requests/RequestOrder";
import SuccessImportantNotice from "../SuccessImportantNotice";
import { PreviewNotificationButton } from "../TopAppBar";

const NotificationList = () => {
  const { handleCustomText } = useTabContext();
  const { notifications, selectedNotification, handleSelectedNotification } =
    useNotificationContext();
  const { activeNav } = useNavContext();

  useEffect(() => {
    if (selectedNotification) {
      handleCustomText(
        notificationMessages[selectedNotification.type].getCustomText(
          selectedNotification.order,
        ),
      );
    }
  }, [selectedNotification, activeNav]);

  if (selectedNotification) {
    const handleBack = () => {
      handleCustomText(null);
      handleSelectedNotification(null);
    };

    // todo: make notification preview/modal folder and data structure
    return (
      <div className="flex max-w-[1094px] flex-col gap-[20px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 p-[20px]">
          <OrderTrackingId
            orderId={selectedNotification.order.orderId}
            trackingId={selectedNotification.order.trackingId}
          />
        </div>
        <CongratulationImage text="We have confirmed your payment. You have just successfully placed a shop for me order by paying for only your shop for me cost." />
        <SuccessImportantNotice />
        <div className="flex flex-col gap-[10px]">
          <SectionHeader title="Track your package" />
          <SectionContentLayout>
            <div className="flex flex-col gap-[10px]">
              <h3 className="title-lg font-bold text-neutral-900">
                Here are more information on how to track
              </h3>
              <ul className="flex flex-col gap-[14px]">
                <StepDescription
                  stepNumber={1}
                  description={
                    <span className="title-lg text-neutral-900">
                      You can start tracking your package in the next 24 hrs
                      using the Tracking ID above or{" "}
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span className="inline-flex items-center gap-[5px] font-bold text-primary-600">
                          this link
                          <ExportCircle color="#292D32" size={18} />
                        </span>
                      </a>
                    </span>
                  }
                />
              </ul>
            </div>
          </SectionContentLayout>
        </div>
        <AndLastly />
        <div className="w-full md:w-[200px]">
          <PrimaryBackButton onClick={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-[1094px] flex-col gap-[20px] rounded-[20px] bg-white p-[20px] md:p-[30px]">
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Most Recent" />
        <div className="rounded-[20px] border border-gray-200 bg-neutral-50 px-[20px] py-[10px]">
          <span className="title-lg text-neutral-900">
            You don&apos;t have any new notifications
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <SectionHeader title="Earlier" />
        {notifications.map((notification, i) => {
          return (
            <NotificationListItem
              key={i}
              index={i}
              notification={notification}
            />
          );
        })}
      </div>
    </div>
  );
};

export type NotificationListItemProps = {
  index: number;
  notification: NotificationItemType;
};

type OrderType =
  | ShopOrderPackageType
  | ImportOrderPackageType
  | ExportOrderPackageType
  | AutoImportOrderPackageType;

type NotificationMessagesType = Record<
  (typeof NOTIFICATION_TYPES)[number],
  {
    getMessage: (order: OrderType) => JSX.Element;
    getCustomText: (order: OrderType) => string;
  }
>;

export const notificationMessages: NotificationMessagesType = {
  "payment confirmation": {
    getMessage: (order) => (
      <>
        Your payment for the Order <b>{order.orderId}</b> has been confirmed
      </>
    ),
    getCustomText: (order) => `payment confirmation - ${order.orderId}`,
  },
  "payment rejection": {
    getMessage: (order) => (
      <>
        Your payment for the Order <b>{order.orderId}</b> has been rejected
      </>
    ),
    getCustomText: (order) => `payment confirmation - ${order.orderId}`,
  },
  "shipment arrival": {
    getMessage: (order) => (
      <>
        Your shipment <b>{order.trackingId}</b> has just arrived at its
        destination address
      </>
    ),
    getCustomText: (order) => `shipment arrival - ${order.trackingId}`,
  },
};

const NotificationListItem = ({
  index,
  notification,
}: NotificationListItemProps) => {
  const { open, toggle } = useAccordion(false);
  const { handleDelete } = useNotificationContext();

  const currentYear = new Date().getFullYear();
  const notifcationYear = new Date(notification.localDate).getFullYear();
  const format = currentYear === notifcationYear ? "MMM D" : "MMM D YYYY";

  return (
    <div className="flex items-center gap-[20px]">
      <div className="flex flex-grow flex-col gap-[10px] rounded-[20px] border border-gray-200 bg-white p-[20px] md:flex-row md:items-center md:gap-[20px]">
        <span className="body-lg flex-grow text-start">
          {notificationMessages[notification.type].getMessage(
            notification.order,
          )}
        </span>
        <span className="title-sm flex justify-between font-medium text-black">
          {dayjs(notification.localDate).format(format)}
          <div className="md:hidden">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </span>
        <div className="hidden md:block">
          <PreviewNotificationButton notification={notification} />
        </div>
        {/* for mobile */}
        {open && (
          <div className="flex flex-col gap-[10px] border-t-[0.5px] border-dashed border-t-gray-500 pt-[10px] md:hidden">
            <PreviewNotificationButton notification={notification} />
            <DeleteItemButton onClick={() => handleDelete(index)} />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <DeleteButtonIcon onClick={() => handleDelete(index)} />
      </div>
    </div>
  );
};

export default NotificationList;
