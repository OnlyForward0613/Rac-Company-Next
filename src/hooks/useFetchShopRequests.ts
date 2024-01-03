import { useQuery, type DefinedUseQueryResult } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import {
  type ShopItemType,
  type ShopRequestPackageType,
} from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import { shopRequests } from "~/fake data";

const useFetchShopRequests = (
  token: string,
): DefinedUseQueryResult<ShopRequestPackageType[], AxiosError> => {
  const { activeTab } = useTabContext();

  const handleFetch = async () => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/sfmRequests/mine/",
      method: "GET",
      headers: headersList,
    };

    const response = await axios.request(reqOptions);
    const { sfmRequests } = response.data as Main;
    const shopRequests: ShopRequestPackageType[] = sfmRequests.map(
      (request) => {
        const requestPackage: ShopRequestPackageType = {
          requestId: request.requestId,
          requestStatus:
            request.requestStatus as ShopRequestPackageType["requestStatus"],
          requestLocalDate: new Date(request.createdAt).toLocaleString(),
          items: request.requestPackages.map((item) => {
            const requestItem: ShopItemType = {
              store: item.store as ShopItemType["store"],
              urgent: item.urgent,
              url: item.itemUrl,
              name: item.itemName,
              originalCost: item.cost,
              quantity: item.qty,
              shippingCost: item.shippingCost,
              image: item.itemImage,
              description: item.description,
            };

            return requestItem;
          }),
        };

        return requestPackage;
      },
    );

    return shopRequests;
  };

  const query = useQuery<ShopRequestPackageType[], AxiosError>({
    queryKey: ["shopRequests"],
    queryFn: async () => {
      console.log("fetching user request packages");
      // const res = await handleFetch();
      // const packages = res;
      const packages = shopRequests;
      if (packages.length > 0) {
        console.log("user request packages: ", packages);
        return packages;
      }

      console.log("user request packages empty");
      return [];
    },
    initialData: [],
    enabled: activeTab === "requests",
  });

  return query;
};

export interface Main {
  success: boolean;
  totalrequests: number;
  sfmRequests: SfmRequest[];
}

export interface SfmRequest {
  requestStatus: string;
  orderStatus: string;
  ShippingStatus: string;
  shopForMeStatus: string;
  _id: string;
  user: string;
  sfmType?: string;
  origin: string;
  requestPackages: RequestItem[];
  contactAddress?: unknown[];
  sfmRequestApproved?: boolean;
  sfmPaymentPaid: boolean;
  processingFeePaid: boolean;
  requestId: string;
  orderId: string;
  trackingId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  shippingAddress: unknown[];
}

export interface RequestItem {
  store: string;
  itemUrl: string;
  itemName: string;
  urgent: boolean;
  itemImage: string;
  itemPrice: number;
  cost: number;
  qty: number;
  shippingCost: number;
  description: string;
  _id: string;
}

export default useFetchShopRequests;
