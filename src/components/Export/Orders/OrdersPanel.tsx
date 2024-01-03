/* eslint-disable @next/next/no-img-element */
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { BackSquare, More, TickSquare } from "iconsax-react";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Balancer from "react-wrap-balancer";
import { capitalizeWords } from "~/Utils";
import { CloseModalButton } from "~/components/Buttons/CloseModalButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import CongratulationImage from "~/components/CongratulationImage";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import MainTable from "~/components/MainTable";
import OrderTrackingId from "~/components/OrderTrackingId";
import { MoreButton } from "~/components/Buttons/MoreButton";
import {
  DetailSection,
  InitiateShippingButton,
} from "~/components/Shop/Orders/InitiateShipping";
import {
  ImageColumn,
  PickUpInstructions,
  TrackButton,
  excluded,
  type ShippingStatusModalProps,
  type ShippingStatusProps,
  type SomeStatusType,
} from "~/components/Shop/Orders/OrdersPanel";
import { CancelButton } from "~/components/Buttons/CancelButton";
import RequestOrderButton from "~/components/Buttons/RequestOrderButton";
import {
  RequestFormHeader,
  SectionHeader,
} from "~/components/Shop/Requests/RequestOrder";
import { type FilterCategoriesType } from "~/components/SearchBar";
import { SHIPPING_STATUS } from "~/constants";
import {
  useExportContext,
  type ExportOrderPackageType,
} from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import InitiateShipping from "./InitiateShipping";
import OrderDetails from "./OrderDetails";

const ExportOrdersPanel = () => {
  const { orderPackages } = useExportContext();
  const { activeAction } = useTabContext();

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
            You have not placed any export order before, would you like to
            create a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const OrdersTable = () => {
  const { orderPackages } = useExportContext();
  const { handleActiveAction, handleViewIndex } = useTabContext();

  const onClick = (index: number) => {
    handleViewIndex(index);
    handleActiveAction("order details");
  };

  const defaultColumns = useMemo(() => {
    const columnHelper = createColumnHelper<ExportOrderPackageType>();

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
            {row.original.orderLocalDate.toLocaleString()}
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
    ] as Array<ColumnDef<ExportOrderPackageType, unknown>>;
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

const ShippingStatus = ({ id, status }: ShippingStatusProps) => {
  const capitalizedWords = status
    .split(" ")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");

  useEffect(() => {
    tailmater();
  }, []);

  const modalId = `shipping-status-modal-${id}`;
  const dataTarget = `#${modalId}`;

  const buttonStyles = {
    "not started": "bg-gray-200 text-gray-700",
    "ready for shipping": "bg-brand-orange text-white",
    "arrived destination": "bg-primary-900 text-white",
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
        aria-label={capitalizedWords}
        className={`btn relative w-full rounded-[10px] px-[10px] py-[5px] text-center ${buttonStyle}`}
      >
        {capitalizedWords}
      </button>
      {createPortal(
        <ShippingStatusModal {...{ modalId, status }} />,
        document.body,
      )}
    </>
  );
};

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
    "arrived destination": "Your package has arrived its destination.",
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
            {[
              "cancelled",
              "not started",
              "cleared",
              "delivered",
              "arrived destination",
            ].includes(status) && <CloseModalButton dataClose={dataClose} />}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOrdersPanel;
