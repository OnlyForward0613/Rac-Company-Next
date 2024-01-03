import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type ShopOrderPackageType } from "~/contexts/ShopContext";

const useSubmitShopRequest = (token: string) => {
  const handleSubmit = async (orderPackage: ShopOrderPackageType) => {
    const data = {
      origin: orderPackage.originWarehouse,
      requestPackages: orderPackage.items.map((item) => {
        const packageItem = {
          store: item.store,
          itemUrl: item.url,
          itemName: item.name,
          urgent: item.urgent,
          itemImage: item.image,
          itemPrice: item.originalCost, // todo: price? === cost?
          cost: item.originalCost,
          qty: item.quantity,
          shippingCost: item.shippingCost,
          description: item.description,
        };

        return packageItem;
      }),
    };

    console.log(data);

    const headersList = {
      Accept: "*/*",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    };

    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/sfmRequests/create",
      method: "POST",
      headers: headersList,
      data: new FormData().append("data", JSON.stringify(data)),
    };

    const response = await axios.request(reqOptions);
    console.log(response);
    return response;
  };

  return useMutation({
    mutationFn: handleSubmit,
  });
};

export interface Main {
  origin: string;
  requestPackages: RequestItem[];
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
}

export default useSubmitShopRequest;
