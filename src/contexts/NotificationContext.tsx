import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type NOTIFICATION_TYPES } from "~/constants";
import { notificationItems } from "~/fake data";
import { type AutoImportOrderPackageType } from "./AutoImportContext";
import { type ExportOrderPackageType } from "./ExportContext";
import { type ImportOrderPackageType } from "./ImportContext";
import { type ShopOrderPackageType } from "./ShopContext";

export type NotificationContextType = {
  notifications: NotificationItemType[];
  selectedNotification: NotificationItemType | null;
  clearAll: () => void;
  handleDelete: (index: number) => void;
  handleNotifications: () => void;
  handleSelectedNotification: (selected: NotificationItemType | null) => void;
};

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
);

type OrderPackageType =
  | ShopOrderPackageType
  | ImportOrderPackageType
  | ExportOrderPackageType
  | AutoImportOrderPackageType;

export type NotificationItemType = {
  localDate: string;
  type: (typeof NOTIFICATION_TYPES)[number];
  order: OrderPackageType;
};

export const useNotificationContext = () => useContext(NotificationContext);

export type PropertyType = { label: string; value: string | undefined };

const NotificationContextProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItemType[]>(
    [],
  );

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItemType | null>(null);

  const clearAll = () => {
    setNotifications([]);
  };

  const handleDelete = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(sortNotificationByDate(newNotifications));
  };

  const handleNotifications = () => {
    setNotifications(sortNotificationByDate(notificationItems));
  };

  const handleSelectedNotification = (
    selected: NotificationItemType | null,
  ) => {
    setSelectedNotification(selected);
  };

  const sortNotificationByDate = (array: NotificationItemType[]) => {
    const sorted = array.sort(
      (a, b) => Number(b.localDate) - Number(a.localDate),
    );
    return sorted;
  };

  // testing purposes
  useEffect(() => {
    handleNotifications();
  }, []);

  const value: NotificationContextType = {
    notifications,
    selectedNotification,
    clearAll,
    handleDelete,
    handleNotifications,
    handleSelectedNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
