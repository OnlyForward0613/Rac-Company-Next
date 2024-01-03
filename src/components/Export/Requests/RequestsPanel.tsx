import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Balancer from "react-wrap-balancer";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import { RequestStatus } from "~/components/Import/Requests/RequestsPanel";
import TabContentLayout from "~/components/Layouts/TabContentLayout";
import MainTable from "~/components/MainTable";
import { MoreButton } from "~/components/Buttons/MoreButton";
import { ImageColumn } from "~/components/Shop/Orders/OrdersPanel";
import RequestOrderButton from "~/components/Buttons/RequestOrderButton";
import { type FilterCategoriesType } from "~/components/SearchBar";
import {
  useExportContext,
  type ExportRequestPackageType,
} from "~/contexts/ExportContext";
import { useTabContext } from "~/contexts/TabContext";
import RequestDetails from "./RequestDetails";
import RequestOrder from "./RequestOrder";

const ExportRequestsPanel = () => {
  const { requestPackages } = useExportContext();
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
            You have not requested for any export order before, would you like
            to request for a new order?
          </Balancer>
        </h2>
        <RequestOrderButton />
      </div>
    </TabContentLayout>
  );
};

const RequestsTable = () => {
  const { requestPackages } = useExportContext();
  const { handleActiveAction, handleViewIndex } = useTabContext();

  const onClick = (index: number) => {
    handleViewIndex(index);
    handleActiveAction("request details");
  };

  const defaultColumns = useMemo(() => {
    const columnHelper = createColumnHelper<ExportRequestPackageType>();

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
    ] as Array<ColumnDef<ExportRequestPackageType, unknown>>;
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

export default ExportRequestsPanel;
