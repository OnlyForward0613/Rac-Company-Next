import { createContext, useContext, useState, type ReactNode } from "react";
import { shopOrders } from "~/fake data";
import { type AutoImportOrderPackageType } from "./AutoImportContext";
import { type ExportOrderPackageType } from "./ExportContext";
import { type ImportOrderPackageType } from "./ImportContext";
import { type ShopOrderPackageType } from "./ShopContext";

type OrderPackageType =
  | ShopOrderPackageType
  | ImportOrderPackageType
  | ExportOrderPackageType
  | AutoImportOrderPackageType;

export type TrackingContextType = {
  orderPackage: OrderPackageType | null;
  handleOrder: (trackingId: string | null) => void;
};

export const TrackingContext = createContext<TrackingContextType>(
  {} as TrackingContextType,
);

export const useTrackingContext = () => useContext(TrackingContext);

export type PropertyType = { label: string; value: string | undefined };

const TrackingContextProvider = ({ children }: { children: ReactNode }) => {
  const [orderPackage, setOrderPackage] = useState<OrderPackageType | null>(
    null,
  );

  const handleOrder = (trackingId: string | null) => {
    const order =
      shopOrders.find((order) => order.trackingId === trackingId) ?? null;
    setOrderPackage(order);
  };

  const value: TrackingContextType = {
    orderPackage,
    handleOrder,
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingContextProvider;
