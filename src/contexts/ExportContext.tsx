import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type ID_TYPE,
  type ORDER_STATUS,
  type REQUEST_STATUS,
  type SHIPPING_STATUS,
} from "~/constants";
import { exportDrafts, exportOrders, exportRequests } from "~/fake data";

export type ExportContextType = {
  clearDrafts: () => void;
  draftItems: ExportDraftPackageType[];
  orderPackages: ExportOrderPackageType[];
  payNowAction: { action: () => void } | null;
  requestPackages: ExportRequestPackageType[];
  handleDrafts: () => void;
  handleOrders: () => void;
  handlePayNowAction: (action: ExportContextType["payNowAction"]) => void;
  handleRequests: () => void;
};

export const ExportContext = createContext<ExportContextType>(
  {} as ExportContextType,
);

export const useExportContext = () => useContext(ExportContext);

type ExportItemType = {
  name: string;
  idType: (typeof ID_TYPE)[number];
  idNumber: string;
  deliveryStatus: string;
  deliveredBy: string;
  originalCost: number;
  quantity: number;
  image: string;
  description: string;
  properties?: {
    label: string;
    value: string;
  }[];
};

export type ExportOrderPackageInput = {
  origin: string;
  packageDeliveryStatus: (typeof SHIPPING_STATUS)[number];
  items: ExportItemType[];
};

export type ExportDraftPackageType = ExportOrderPackageInput;

export type ExportOrderPackageType = {
  orderId: string;
  orderStatus: (typeof ORDER_STATUS)[number];
  orderLocalDate: string;
  trackingId: string;
  shippingStatus: (typeof SHIPPING_STATUS)[number];
  shippingCost: number;
  items: ExportItemType[];
};

export type ExportRequestPackageType = {
  requestId: string;
  requestStatus: (typeof REQUEST_STATUS)[number];
  requestLocalDate: string;
  items: ExportItemType[];
};

export type PropertyType = { label: string; value: string | undefined };

const ExportContextProvider = ({ children }: { children: ReactNode }) => {
  const [draftPackages, setDraftPackages] = useState<ExportDraftPackageType[]>(
    [],
  );
  const [orderPackages, setOrderPackages] = useState<ExportOrderPackageType[]>(
    [],
  );
  const [payNowAction, setPayNowAction] =
    useState<ExportContextType["payNowAction"]>(null);
  const [requestPackages, setRequestPackages] = useState<
    ExportRequestPackageType[]
  >([]);

  const clearDrafts = () => {
    setDraftPackages([]);
  };

  const handleDrafts = () => {
    setDraftPackages(exportDrafts);
  };

  const handleOrders = () => {
    setOrderPackages(exportOrders);
  };

  const handlePayNowAction = (action: ExportContextType["payNowAction"]) => {
    setPayNowAction(action);
  };

  const handleRequests = () => {
    setRequestPackages(exportRequests);
  };

  // testing purposes
  useEffect(() => {
    handleRequests();
    handleOrders();
    handleDrafts();
  }, []);

  const value: ExportContextType = {
    clearDrafts,
    draftItems: draftPackages,
    orderPackages: orderPackages,
    payNowAction,
    requestPackages: requestPackages,
    handleDrafts,
    handleOrders,
    handlePayNowAction,
    handleRequests,
  };

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};

export default ExportContextProvider;
