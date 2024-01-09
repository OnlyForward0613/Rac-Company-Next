export const ORDER_STATUS = [
  "responded",
  "processed",
  "not responded",
] as const;

export const SHIPPING_STATUS = [
  "ready for shipping",
  "not started",
  "processing",
  "cancelled",
  "in transit",
  "arrived destination",
  "cleared",
  "delivered",
] as const;

export const REQUEST_STATUS = ["Responded", "Not Responded"] as const;

export const ID_TYPE = ["Order ID", "Tracking ID", "Shipping ID"] as const;

export const SHOP_FOR_ME_STATUS = [
  "Purchase not started",
  "Purchase in progress",
  "Purchase completed",
] as const;

export const ACTION_CONST = [
  "proceed to checkout",
  "order details",
  "request details",
  "draft details",
  "request new order",
  "initiate shipping",
  "clear package",
  "track",
] as const;

export const TAB_IDS = ["orders", "requests", "drafts"] as const;

export const ORIGINS = [
  "Nigeria Warehouse (Lagos)",
  "US Warehouse (Richmond Texas)",
  "UK Warehouse (London)",
  "Dubai Warehouse",
  "China Warehouse (Guangzhou city)",
] as const;

export const STORES = [
  "Amazon",
  "Ebay",
  "Aliexpress",
  "Walmart",
  "Others",
] as const;

export const CONDITIONS = ["Drivable", "Not Drivable"] as const;

export const SERVICES = [
  "export",
  "import",
  "auto import",
  "shop for me",
] as const;

export const NAV_TITLES = [
  "Home",
  "Shop For Me",
  "Export",
  "Import",
  "Auto Import",
  "Tracking",
  "Payment History",
  "Get a Quote",
  "Help",
  "Settings",
  "Logout",
  "Notifications",
] as const;

export const NOTIFICATION_TYPES = [
  "payment confirmation",
  "payment rejection",
  "shipment arrival",
] as const;

export const AUTO_IMPORT_ORIGINS = ["Nigeria Warehouse (Lagos)"] as const;

export const CAR_CONDITIONS = ["Drivable", "Not Drivable"] as const;
