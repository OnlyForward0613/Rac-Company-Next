import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Activity,
  ArrowCircleRight2,
  ArrowDown2,
  ArrowRight2,
  ArrowUp2,
  Celo,
  Eye,
  HambergerMenu,
  NotificationBing,
  Profile,
  SecuritySafe,
  User,
} from "iconsax-react";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthContext } from "~/contexts/AuthContext";
import { useNavContext } from "~/contexts/NavigationContext";
import {
  useNotificationContext,
  type NotificationItemType,
} from "~/contexts/NotificationContext";
import useAccordion from "~/hooks/useAccordion";
import tailmater from "~/js/tailmater";
import { CloseModalButton } from "../Buttons/CloseModalButton";
import { DeleteButtonIcon } from "../Buttons/DeleteButtonIcon";
import { DeleteItemButton } from "../Buttons/DeleteItemButton";
import AccordionButton from "../Forms/AccordionButton";
import {
  notificationMessages,
  type NotificationListItemProps,
} from "../Notifications/NotificationList";
import { RequestFormHeader } from "../Shop/Requests/RequestOrder";
import AppBarTabs from "./AppBarTabs";
import BreadCrumbs from "./BreadCrumbs";

dayjs.extend(relativeTime);

type TopAppBarProps = { tabs?: boolean };

const TopAppBar = ({ tabs = true }: TopAppBarProps) => {
  return (
    <div className="sticky top-0 z-40 flex flex-col">
      <div className="flex w-full items-center justify-between gap-[10px] bg-white px-[20px] pb-[10px] pt-[25px] md:h-[120px] md:px-[40px]">
        <div className="md:hidden">
          <MenuButton />
        </div>
        <div className="hidden flex-col gap-[10px] md:flex">
          <TopAppBarHeader />
        </div>
        <div className="flex flex-row items-center justify-end">
          <NotificationButton />
          <AccountButton />
        </div>
      </div>
      {/* mobile version */}
      <div className="flex flex-col items-center justify-center gap-[10px] bg-white pb-[10px] md:hidden">
        <TopAppBarHeader />
      </div>
      {!tabs && (
        <div className="h-[20px] overflow-hidden rounded-b-[20px] border-b-[1px] border-b-gray-200 bg-white"></div>
      )}
      {/* tabs */}
      {tabs && (
        <div className="h-[50px] w-full rounded-b-[20px] border-b-[1px] border-t-[0.5px] border-b-gray-200 border-t-gray-500 bg-white">
          <AppBarTabs />
        </div>
      )}
    </div>
  );
};

const TopAppBarHeader = () => {
  const { activeNav } = useNavContext();

  return (
    <>
      <h1 className="title-lg md:headline-md text-center text-brand md:text-left">
        {activeNav}
      </h1>
      <BreadCrumbs />
    </>
  );
};

const MenuButton = () => {
  return (
    <button
      data-type="dialogs"
      data-target="#sheet_b"
      className="flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
    >
      <HambergerMenu className="text-gray-500" />
    </button>
  );
};

const NotificationButton = () => {
  const id = "notification";
  const dataTarget = `#${id}`;

  const { notifications } = useNotificationContext();

  useEffect(() => {
    tailmater();
  }, []);

  return (
    <>
      <button
        aria-label="Notifications"
        data-type="dialogs"
        data-target={dataTarget}
        className="btn relative flex h-12 w-12 items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
      >
        <NotificationBing className="text-gray-500" />
        {notifications.length > 0 && (
          <div className="label-sm absolute right-3 top-3 flex h-[10px] min-w-[10px] items-center justify-center rounded-full bg-error-600 p-1 text-[8px] text-white">
            {/* put notification count here */}
          </div>
        )}
      </button>
      {createPortal(<NotificationModal id={id} />, document.body)}
    </>
  );
};

type NotificationModalProps = { id: string };

const NotificationModal = ({ id }: NotificationModalProps) => {
  const dataClose = `#${id}`;

  const { notifications, clearAll } = useNotificationContext();

  return (
    <div
      id={id}
      className="ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center  [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div className="z-50 flex h-max w-full max-w-[900px] flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px]">
        <RequestFormHeader title="Notifications" />
        <div className="flex flex-col gap-[30px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col gap-[10px]">
              {notifications.map((notification, i) => {
                return (
                  <NotificationItem
                    key={i}
                    dataClose={dataClose}
                    index={i}
                    notification={notification}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">Empty</div>
          )}
          <div className="flex flex-col items-center justify-center gap-[10px] md:flex-row [&>*]:w-max">
            <ClearAllButton onClick={clearAll} />
            <ViewAllButton dataClose={dataClose} />
            <CloseModalButton dataClose={dataClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

type ViewAllButtonProps = { dataClose: string };

const ViewAllButton = ({ dataClose }: ViewAllButtonProps) => {
  return (
    <Link href="/notifications" data-close={dataClose}>
      <div
        aria-label="Proceed"
        className="btn relative flex h-[40px] w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] border border-gray-500 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
      >
        <ArrowCircleRight2
          size={18}
          variant="Bold"
          className="text-primary-600"
        />
        <span className="label-lg text-primary-600">View All</span>
      </div>
    </Link>
  );
};

type ClearAllButtonProps = { onClick: () => void };

const ClearAllButton = ({ onClick }: ClearAllButtonProps) => {
  return (
    <button
      type="button"
      aria-label="clear all"
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-transparent px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-primary-600 md:px-6"
    >
      <span className="label-lg">Clear All</span>
    </button>
  );
};

type NotificationItemProps = NotificationListItemProps & { dataClose: string };

const NotificationItem = ({ dataClose, index }: NotificationItemProps) => {
  const { open, toggle } = useAccordion(false);
  const { notifications, handleDelete } = useNotificationContext();
  const notification = notifications[index];

  if (notification === undefined) return;

  return (
    <div className="flex items-center gap-[20px]">
      <div className="flex flex-grow flex-col gap-[20px] rounded-[20px] bg-surface-100 p-[20px] md:flex-row md:items-center">
        <span className="body-lg flex-grow text-start">
          {notificationMessages[notification.type].getMessage(
            notification.order,
          )}
        </span>
        <span className="title-sm flex justify-between font-medium text-black">
          {dayjs(notification.localDate).fromNow()}
          <div className="md:hidden">
            <AccordionButton {...{ open, toggle }} />
          </div>
        </span>
        <div className="hidden md:block">
          <PreviewNotificationButton
            dataClose={dataClose}
            notification={notification}
          />
        </div>
        {/* for mobile */}
        {open && (
          <div className="flex flex-col gap-[10px] border-t-[0.5px] border-dashed border-t-gray-500 pt-[10px] md:hidden">
            <PreviewNotificationButton
              dataClose={dataClose}
              notification={notification}
            />
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

type PreviewNotificationButtonProps = {
  dataClose?: string;
  notification: NotificationItemType;
};

export const PreviewNotificationButton = ({
  dataClose,
  notification,
}: PreviewNotificationButtonProps) => {
  const { handleSelectedNotification } = useNotificationContext();

  const handleClick = () => {
    handleSelectedNotification(notification);
  };

  return (
    <Link href="/notifications">
      <div
        onClick={handleClick}
        data-close={dataClose}
        aria-label="Preview Notification"
        className="btn relative hidden flex-row items-center justify-center rounded-[6.25rem] md:flex"
      >
        <Eye />
      </div>

      <div
        onClick={handleClick}
        data-close={dataClose}
        aria-label="Preview Notification"
        className="btn relative flex flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:hidden md:px-6"
      >
        <Eye size={18} variant="Bold" />
        <span>Preview</span>
      </div>
    </Link>
  );
};

const AccountButton = () => {
  const { open, toggle } = useAccordion(false);
  const { handleLogout } = useAuthContext();

  return (
    <div className="group relative">
      <button
        onClick={toggle}
        className="group peer flex h-fit w-fit items-center justify-center rounded-[6.25rem] p-3 hover:bg-surface-300 focus:bg-surface-400"
      >
        <User className="text-gray-500" />
        <ArrowDown2
          variant="Bold"
          className="text-gray-500 group-focus:hidden group-focus-visible:hidden"
        />
        <ArrowUp2
          variant="Bold"
          className="hidden text-gray-500 group-focus:block group-focus-visible:block"
        />
      </button>
      <div
        className={`absolute right-0 top-0 z-50 hidden w-[320px] flex-col gap-[30px] overflow-y-auto rounded-[20px] bg-surface-200 p-[20px] shadow-md group-focus-within:inline-flex md:top-16 ${
          open ? "hover:inline-flex" : "group-focus-within:hidden"
        }`}
      >
        <AccountMenuItem
          icon={<Profile color="#292D32" />}
          label="Profile Information"
        />
        <AccountMenuItem
          icon={<Activity color="#292D32" />}
          label="Account Activities"
        />
        <AccountMenuItem
          icon={<SecuritySafe color="#292D32" />}
          label="Account Security"
        />
        <AccountMenuItem icon={<Celo color="#292D32" />} label="Help" />

        <LogoutButton onClick={handleLogout} />
      </div>
    </div>
  );
};

type LogoutButtonProps = { onClick: () => void };

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Logout"
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <span className="body-lg text-white">Logout</span>
    </button>
  );
};

type AccountMenuItemProps = { icon: JSX.Element; label: string };

const AccountMenuItem = ({ icon, label }: AccountMenuItemProps) => {
  return (
    <button className="flex items-center justify-between">
      <div className="flex gap-[16px]">
        {icon}
        <span className="body-lg text-neutral-900">{label}</span>
      </div>
      <ArrowRight2 size={18} variant="Bold" className="text-neutral-900" />
    </button>
  );
};
export default TopAppBar;
