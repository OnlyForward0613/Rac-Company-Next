import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Balancer from "react-wrap-balancer";
import { CloseModalButton } from "~/components/Buttons/CloseModalButton";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import LabelId from "~/components/LabelId";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import MainTable from "~/components/MainTable";
import { MoreButton } from "~/components/Buttons/MoreButton";
import { InitiateShippingButton } from "~/components/Shop/Orders/InitiateShipping";
import { ImageColumn } from "~/components/Shop/Orders/OrdersPanel";
import { CancelButton } from "~/components/Buttons/CancelButton";
import RequestOrderButton from "~/components/Buttons/RequestOrderButton";
import { RequestFormHeader } from "~/components/Shop/Requests/RequestOrder";
import {
  type RequestStatusModalProps,
  type RequestStatusProps,
} from "~/components/Shop/Requests/RequestsPanel";
import { type FilterCategoriesType } from "~/components/SearchBar";
import {
  useImportContext,
  type ImportRequestPackageType,
} from "~/contexts/ImportContext";
import { useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import RequestDetails from "./RequestDetails";
import RequestOrder from "./RequestOrder";

const ImportRequestsPanel = () => {
  const { requestPackages } = useImportContext();
  const { activeAction } = useTabContext();

  if (activeAction === "request new order") {
    return (
      <TabContentLayout>
        <RequestOrder />
      </TabContentLayout>
    );
  }

  if (activeAction === "request details") {
    return (
      <TabContentLayout>
        <RequestDetails />
      </TabContentLayout>
    );
  }

  if (Array.isArray(requestPackages) && requestPackages.length > 0) {
    return (
      <TabContentLayout>
        <RequestsTable />
        <NeedHelpFAB />
      </TabContentLayout>
    );
  }

  return (
    <TabContentLayout>
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-[30px]">
        <h2 className="title-lg max-w-[462px] text-center">
          <Balancer>
            You have not requested for any import order before, would you like
            to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const RequestsTable = () => {
  const { requestPackages } = useImportContext();
  const { handleActiveAction, handleViewIndex } = useTabContext();

  const onClick = (index: number) => {
    handleViewIndex(index);
    handleActiveAction("request details");
  };

  const defaultColumns = useMemo(() => {
    const columnHelper = createColumnHelper<ImportRequestPackageType>();

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
      columnHelper.accessor("requestId", {
        header: "Request ID",
        cell: ({ row }) => (
          <span className="title-md font-medium">{row.original.requestId}</span>
        ),
      }),
      columnHelper.display({
        id: "requestStatus",
        header: "Request Status",
        cell: ({ row }) => (
          <RequestStatus id={row.id} status={row.original.requestStatus} />
        ),
      }),
      columnHelper.accessor("requestLocalDate", {
        header: "Request Date",
        cell: ({ row }) => (
          <span className="title-md font-medium">
            {row.original.requestLocalDate.toLocaleString()}
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
    ] as Array<ColumnDef<ImportRequestPackageType, unknown>>;
  }, []);

  const filterCategories = useMemo<FilterCategoriesType[]>(
    () => [
      {
        category: "Order request status",
        categoryFilters: [{ label: "Responded" }, { label: "Not responded" }],
      },
    ],
    [],
  );

  return (
    <MainTable
      id="requests"
      columns={defaultColumns}
      data={requestPackages}
      filterCategories={filterCategories}
    />
  );
};

export const RequestStatus = ({ id, status }: RequestStatusProps) => {
  const capitalizedWords = status
    .split(" ")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");

  useEffect(() => {
    tailmater();
  }, []);

  const modalId = `request-status-modal-${id}`;
  const dataTarget = `#${modalId}`;

  const buttonStyles = {
    "Not Responded": "bg-gray-200 text-gray-700",
    Responded: "bg-brand-orange text-white",
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
        <RequestStatusModal {...{ modalId, status }} />,
        document.body,
      )}
    </>
  );
};

const RequestStatusModal = ({ modalId, status }: RequestStatusModalProps) => {
  const dataClose = `#${modalId}`;

  const content = {
    "Not Responded":
      "Your request has not be responded to yet. Kindly check back later.",
    Responded:
      "Your request has been responded to. Kindly proceed to initiate shipping for your package.",
  };

  const { handleActiveAction, handleTabChange } = useTabContext();

  const onClick = () => {
    handleTabChange("orders");
    handleActiveAction("initiate shipping");
  };

  return (
    <div
      id={modalId}
      className="ease-[cubic-bezier(0, 0, 0, 1)] fixed left-0 top-0 z-50 flex h-0 w-full items-center justify-center overflow-auto p-4 opacity-0 duration-[400ms] md:items-center [&.show]:inset-0 [&.show]:h-full [&.show]:opacity-100"
    >
      <div
        data-close={dataClose}
        className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"
      ></div>
      <div className="z-50 flex h-max w-full max-w-[700px] flex-col gap-[30px] rounded-[20px] bg-surface-300 p-[20px] md:p-[30px]">
        <RequestFormHeader title="Request Status" />

        <LabelId label="Request ID" id="R78667" />

        <p className="title-lg text-neutral-900">{content[status]}</p>

        <div className="flex flex-row items-end justify-end">
          <div className="w-max whitespace-nowrap">
            {status === "Not Responded" && (
              <CloseModalButton dataClose={dataClose} />
            )}
            {status === "Responded" && (
              <div className="flex gap-[8px]">
                <CancelButton dataClose={dataClose} />
                <InitiateShippingButton
                  dataClose={dataClose}
                  onClick={onClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportRequestsPanel;
