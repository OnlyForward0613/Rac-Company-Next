/* eslint-disable @next/next/no-img-element */
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import {
  BackSquare,
  ClipboardTick,
  ExportCircle,
  More,
  Ship,
  TickSquare,
} from "iconsax-react";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Balancer from "react-wrap-balancer";
import { capitalizeWords } from "~/Utils";
import { CloseModalButton } from "~/components/Buttons/CloseModalButton";
import CongratulationImage from "~/components/CongratulationImage";
import { LoadingSpinner } from "~/components/LoadingScreen";
import OrderTrackingId from "~/components/OrderTrackingId";
import { SHIPPING_STATUS, SHOP_FOR_ME_STATUS } from "~/constants";
import {
  useShopContext,
  type ShopOrderPackageType,
} from "~/contexts/ShopContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import { MoreButton } from "../../Buttons/MoreButton";
import NeedHelpFAB from "../../Buttons/NeedHelpFAB";
import TabContentLayout from "../../Layouts/TabContentLayout";
import MainTable from "../../MainTable";
import RequestOrderButton from "../../Buttons/RequestOrderButton";
import { RequestFormHeader, SectionHeader } from "../Requests/RequestOrder";
import { type ModalCloseType } from "../Requests/RequestsPanel";
import { type FilterCategoriesType } from "../../SearchBar";
import ClearPackage from "./ClearPackage";
import InitiateShipping, { DetailSection } from "./InitiateShipping";
import OrderDetails from "./OrderDetails";
import { CancelButton } from "../../Buttons/CancelButton";

const ShopOrdersPanel = () => {
  const { orderPackages, isFetchingOrderPackages } = useShopContext();
  const { activeAction } = useTabContext();

  if (isFetchingOrderPackages) {
    return (
      <TabContentLayout>
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner />
        </div>
      </TabContentLayout>
    );
  }

  if (activeAction === "clear package") {
    return (
      <TabContentLayout>
        <ClearPackage />
      </TabContentLayout>
    );
  }

  if (activeAction === "initiate shipping") {
    return (
      <TabContentLayout>
        <InitiateShipping />
      </TabContentLayout>
    );
  }

  if (activeAction === "order details") {
    return (
      <TabContentLayout>
        <OrderDetails />
      </TabContentLayout>
    );
  }

  if (Array.isArray(orderPackages) && orderPackages.length > 0) {
    return (
      <TabContentLayout>
        <OrdersTable />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not placed any shop for me order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const OrdersTable = () => {
  const { orderPackages } = useShopContext();
  const { handleActiveAction, handleViewIndex } = useTabContext();

  const onClick = (index: number) => {
    handleViewIndex(index);
    handleActiveAction("order details");
  };

  const defaultColumns = useMemo(() => {
    const columnHelper = createColumnHelper<ShopOrderPackageType>();

    return [
      columnHelper.display({
        id: "checkbox",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => {
              table.toggleAllPageRowsSelected(!!e.target.checked);
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            name={`check-${row.index}`}
            className="h-[18px] w-[18px] rounded-[2px] accent-primary-600 hover:accent-primary-600"
            checked={row.getIsSelected()}
            onChange={(e) => {
              row.toggleSelected(!!e.target.checked);
            }}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.display({
        id: "images",
        header: "Package(s) Image",
        cell: ({ row }) => (
          <ImageColumn images={row.original.items.map((item) => item.image)} />
        ),
      }),
      columnHelper.accessor("orderId", {
        header: "Order ID",
        cell: ({ row }) => (
          <span className="title-md font-medium">{row.original.orderId}</span>
        ),
      }),
      columnHelper.display({
        id: "orderStatus",
        header: "Order Status",
        cell: ({ row }) => (
          <span className="title-md font-medium">
            {capitalizeWords(row.original.orderStatus)}
          </span>
        ),
      }),
      columnHelper.accessor("orderLocalDate", {
        header: "Order Date",
        cell: ({ row }) => (
          <span className="title-md font-medium">
            {row.original.orderLocalDate}
          </span>
        ),
      }),
      columnHelper.accessor("trackingId", {
        header: "Tracking ID",
        cell: ({ row }) => (
          <span className="title-md font-medium text-primary-900">
            {row.original.trackingId}
          </span>
        ),
      }),
      columnHelper.display({
        id: "shippingStatus",
        header: "Shipping Status",
        cell: ({ row }) => (
          <ShippingStatus
            id={row.original.orderId}
            status={row.original.shippingStatus}
          />
        ),
      }),
      columnHelper.display({
        id: "shopForMeStatus",
        header: "Shop For Me Status",
        cell: ({ row }) => (
          <span className="title-md font-medium">
            {capitalizeWords(row.original.shopForMeStatus)}
          </span>
        ),
      }),
      columnHelper.accessor("shopForMeCost", {
        header: "Shop For Me Cost",
        cell: ({ row }) => (
          <span className="title-md flex gap-[5px] font-medium">
            <TickSquare size="20" variant="Bold" className="text-primary-600" />
            ${row.original.shopForMeCost}
          </span>
        ),
      }),
      columnHelper.accessor("shippingCost", {
        header: "Shipping Cost",
        cell: ({ row }) => (
          <span className="title-md flex gap-[5px] font-medium">
            <More size="20" variant="Bold" className="text-error-600" />$
            {row.original.shippingCost}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <MoreButton onClick={() => onClick(Number(row.id))} />
        ),
        enableHiding: false,
      }),
    ] as Array<ColumnDef<ShopOrderPackageType, unknown>>;
  }, []);

  const filterCategories = useMemo<FilterCategoriesType[]>(
    () => [
      {
        category: "Order status",
        categoryFilters: [
          { label: "Processed" },
          { label: "Processing" },
          { label: "Unprocessed" },
        ],
      },
      {
        category: "Payment status",
        categoryFilters: [
          {
            label: (
              <span className="flex items-center gap-[10px]">
                Confirmed
                <TickSquare
                  size={18}
                  variant="Bold"
                  className="text-primary-900"
                />
              </span>
            ),
          },
          {
            label: (
              <span className="flex items-center gap-[5px]">
                Not yet confirmed
                <More size={18} variant="Bold" className="text-error-600" />
              </span>
            ),
          },
          {
            label: (
              <span className="flex items-center gap-[5px]">
                Reversed
                <BackSquare
                  size={18}
                  variant="Bold"
                  className="text-primary-600"
                />
              </span>
            ),
          },
        ],
      },
      {
        category: "Shipping cost",
        categoryFilters: [
          { label: "$0 - $20" },
          { label: "$20 - $50" },
          { label: "$50 - $100" },
          { label: "$100 - $500" },
          { label: "Above $500" },
        ],
      },
      {
        category: "Shop for me cost",
        categoryFilters: [
          { label: "$0 - $20" },
          { label: "$20 - $50" },
          { label: "$50 - $100" },
          { label: "$100 - $500" },
          { label: "Above $500" },
        ],
      },
      {
        category: "Shop for me status",
        categoryFilters: SHOP_FOR_ME_STATUS.map((status) => {
          return { label: capitalizeWords(status) };
        }),
      },
      {
        category: "Shipment status",
        categoryFilters: SHIPPING_STATUS.map((status) => {
          return { label: capitalizeWords(status) };
        }),
      },
    ],
    [],
  );

  return (
    <MainTable
      id="orders"
      columns={defaultColumns}
      data={orderPackages}
      filterCategories={filterCategories}
    />
  );
};

type ImageColumnProps = { images: string[] };

export const ImageColumn = ({ images }: ImageColumnProps) => {
  return (
    <div className="w-full max-w-[130px] overflow-hidden rounded-[10px] border-0 bg-surface-100 p-0">
      <div className="m-[5px] grid h-full max-h-[50px] max-w-[150px] grid-cols-2 grid-rows-2 place-items-center gap-x-[10px] gap-y-[5px]">
        {images.length === 1 && (
          <div className="col-span-full row-span-full flex max-h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
            <img src={images[0]} alt="package image" />
          </div>
        )}
        {images.length === 2 && (
          <>
            <div className="col-span-1 row-span-full flex max-h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
              <img src={images[0]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-full flex max-h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
              <img src={images[1]} alt="package image" />
            </div>
          </>
        )}
        {images.length === 3 && (
          <>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[0]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-2 flex max-h-[50px] items-center justify-center overflow-hidden rounded-[10px]">
              <img src={images[1]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[2]} alt="package image" />
            </div>
          </>
        )}
        {images.length === 4 && (
          <>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[0]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[1]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[2]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[3]} alt="package image" />
            </div>
          </>
        )}
        {images.length >= 5 && (
          <>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[0]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[1]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <img src={images[2]} alt="package image" />
            </div>
            <div className="col-span-1 row-span-1 flex max-h-[22px] items-center justify-center overflow-hidden rounded-[5px]">
              <div className="label-lg flex items-center p-[10px] text-secondary-600">{`${
                images.length - 4
              }+`}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export type ShippingStatusProps = {
  id: string;
  status: ShopOrderPackageType["shippingStatus"];
};

export const ShippingStatus = ({ id, status }: ShippingStatusProps) => {
  useEffect(() => {
    tailmater();
  }, []);

  const modalId = `shipping-status-modal-${id}`;
  const dataTarget = `#${modalId}`;

  const buttonStyles = {
    "not started": "bg-gray-200 text-gray-700",
    "ready for shipping": "bg-brand-orange text-white",
    "arrived destination": "bg-brand-orange text-white",
    "in transit": "bg-primary-600 text-white",
    processing: "bg-gray-500 text-white",
    cleared: "bg-primary-900 text-white",
    delivered: "bg-primary-900 text-white",
    cancelled: "bg-error-600 text-white",
  };

  const buttonStyle = buttonStyles[status];

  return (
    <>
      <button
        data-type="dialogs"
        data-target={dataTarget}
        aria-label={capitalizeWords(status)}
        className={`btn title-sm relative w-[150px] rounded-[10px] px-[10px] py-[5px] text-center font-medium ${buttonStyle}`}
      >
        {capitalizeWords(status)}
      </button>
      {createPortal(
        <ShippingStatusModal {...{ modalId, status }} />,
        document.body,
      )}
    </>
  );
};

export type ShippingStatusModalProps = {
  modalId: string;
  status: ShippingStatusProps["status"];
};

export const excluded = ["not started", "cancelled", "cleared", "delivered"];

const EXCLUDED_CONST = [...excluded] as const;

export type SomeStatusType = Exclude<
  ShippingStatusProps["status"],
  (typeof EXCLUDED_CONST)[number]
>;

const ShippingStatusModal = ({ modalId, status }: ShippingStatusModalProps) => {
  const dataClose = `#${modalId}`;

  const content = {
    cancelled:
      "Kindly note that the shipping for your package has been cancelled.",
    "not started":
      "The purchase of the item(s) in your package has not started or under process. We will notify you your package is ready for shipping.",
    "ready for shipping":
      "Your package is ready to be shipped, kindly proceed to initiate shipping for your package.",
    processing:
      "Your shipment is under processing, would you like to track it?",
    "in transit": "Your package is in transit, would you like to track it?",
    "arrived destination":
      "Your package has arrived its destination, you are required to clear it now before you can pick it up.",
  };

  const statusToImageMap = {
    "ready for shipping": "/images/shipping status modal/roadmap1_image.svg",
    processing: "/images/shipping status modal/roadmap1_image.svg",
    "in transit": "/images/shipping status modal/roadmap2_image.svg",
    "arrived destination": "/images/shipping status modal/roadmap3_image.svg",
  };

  const imagePath = statusToImageMap[status as SomeStatusType];

  const maxWidth =
    status === "cleared" ? "max-w-[1000px] mt-60" : "max-w-[700px]";

  const marginTop = status === "cleared" ? "mt-[400px] md:mt-[300px]" : "";

  return (
    <div
      id={modalId}
      className={
        "ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full items-center  justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
      }
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div
        className={`z-50 flex h-max w-full flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px] ${maxWidth} ${marginTop}`}
      >
        <RequestFormHeader title="Shipping Status" />

        <div className="flex w-full items-center justify-center gap-[10px] rounded-[20px] border border-gray-200 bg-surface-200 p-[20px]">
          <OrderTrackingId orderId="OD78667" trackingId="SH78667" />
        </div>

        {!excluded.includes(status) && (
          <div className="flex rounded-[20px] bg-primary-900 px-[20px] py-[10px] text-white">
            <hr className="h-[65px] border-r border-solid border-white" />
            <div className="flex flex-col">
              <div className="flex flex-col gap-[1px] pl-[10px]">
                <span className="title-md font-bold">Origin:</span>
                <span className="label-lg">Nigeria</span>
              </div>
              {imagePath && (
                <img
                  src={imagePath}
                  alt={`roadmap ${status} image`}
                  className="my-4 md:-my-2"
                />
              )}
              <div className="flex flex-col gap-[1px] self-end pr-[10px]">
                <span className="title-md font-bold">Origin:</span>
                <span className="label-lg">USA</span>
              </div>
            </div>
            <hr className="h-[65px] self-end border-r border-solid border-secondary-600" />
          </div>
        )}

        {status === "delivered" && (
          <CongratulationImage text="Your package has been delivered." />
        )}
        {status === "cleared" && (
          <>
            <CongratulationImage text="you can now pick up your package from our office in Nigeria (your selected “Destination”)" />

            <div className="rounded-[20px] border border-gray-200 bg-surface-200 px-[28px] py-[20px]">
              <div className="grid w-fit grid-cols-1 gap-[15px] md:grid-cols-4">
                <DetailSection
                  label="Pick up Address"
                  value="No, 1osolo way, ikeja road, behind scaint merry"
                />
                <DetailSection
                  label="Country"
                  value="Nigeria"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
                <DetailSection
                  label="State"
                  value="Lagos"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
                <DetailSection
                  label="City"
                  value="Ikeja"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
                <DetailSection
                  label="Zip/postal Code"
                  value="98765"
                  colSpanMobile={1}
                  colSpanDesktop={1}
                />
              </div>
            </div>
            <SectionHeader title="What next?" />
            <PickUpInstructions />
          </>
        )}

        <p className="title-lg text-neutral-900">
          {content[status as SomeStatusType]}
        </p>

        <div className="flex flex-row items-end justify-end">
          <div className="w-max whitespace-nowrap">
            {["cancelled", "not started", "cleared", "delivered"].includes(
              status,
            ) && <CloseModalButton dataClose={dataClose} />}
            {status === "ready for shipping" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <InitiateShippingButton dataClose={dataClose} />
              </div>
            )}
            {(status === "processing" || status === "in transit") && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <TrackButton dataClose={dataClose} />
              </div>
            )}
            {status === "arrived destination" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <ClearPackageButton dataClose={dataClose} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PickUpInstructions = () => {
  return (
    <div className="flex w-full flex-col gap-[20px] rounded-[20px] border border-gray-200 px-[14px] py-[20px]">
      <span className="title-md md:title-lg pl-[11px] font-medium md:pl-[14px] md:font-bold">
        Here is how to pick your package up from our office
      </span>
      <hr className="w-full border-gray-500 md:hidden" />
      <StepDescription
        stepNumber={1}
        description={
          <>
            When you come to pick up your package from our office, you will
            provide us the <b>Order ID</b> to ensure that we give you the
            package that rightly belongs to you.
          </>
        }
      />
      <hr className="w-full border-gray-500 md:hidden" />
      <StepDescription
        stepNumber={2}
        description={
          <>
            If you won&apos;t be able to come pick up your package up from our
            office, you can request for a doorstep delivery from us{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="title-md md:title-lg inline-flex items-center gap-[5px] text-primary-600"
            >
              <b>here</b>
              <ExportCircle color="#292D32" size={18} />
            </a>
          </>
        }
        backgroundColor="bg-secondary-900"
      />
    </div>
  );
};

type StepDescriptionProps = {
  stepNumber: number;
  description: string | JSX.Element;
  backgroundColor?: "bg-primary-600" | "bg-secondary-900";
};

export const StepDescription = ({
  stepNumber,
  description,
  backgroundColor,
}: StepDescriptionProps) => {
  const bg = backgroundColor ?? "bg-primary-600";

  return (
    <div className="flex items-center gap-[20px]">
      <span className={`title-lg rounded-[20px] ${bg} p-[10px] text-white`}>
        {stepNumber}
      </span>
      <span className="body-lg md:title-lg text-gray-900">{description}</span>
    </div>
  );
};

type ClearPackageButtonProps = ModalCloseType;

export const ClearPackageButton = ({ dataClose }: ClearPackageButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("clear package");
  };

  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <ClipboardTick variant="Bold" />
      <span className="label-lg text-white">Clear Package</span>
    </button>
  );
};

type TrackButtonProps = ModalCloseType;

export const TrackButton = ({ dataClose }: TrackButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("track");
  };
  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <img
        src="/images/shipping status modal/track_icon.svg"
        alt="track icon"
      />
      <span className="label-lg text-white">Track</span>
    </button>
  );
};

type InitiateShippingButtonProps = ModalCloseType;

const InitiateShippingButton = ({ dataClose }: InitiateShippingButtonProps) => {
  const { handleActiveAction } = useTabContext();

  const onClick = () => {
    handleActiveAction("initiate shipping");
  };

  return (
    <button
      data-close={dataClose}
      onClick={onClick}
      className="btn relative flex w-full flex-row items-center justify-center gap-x-2 rounded-[6.25rem] bg-primary-600 px-4 py-2.5 text-sm font-medium tracking-[.00714em] text-white md:px-6"
    >
      <Ship size="18" variant="Bold" />
      <span className="label-lg text-white">Initiate Shipping</span>
    </button>
  );
};

export default ShopOrdersPanel;
