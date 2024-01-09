import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowSquareLeft,
  ArrowSquareRight,
  ArrowSwapVertical,
} from "iconsax-react";
import { Fragment, useMemo, useState, type ChangeEventHandler } from "react";
import Balancer from "react-wrap-balancer";
import useAccordion from "~/hooks/useAccordion";
import AccordionButton from "./Forms/AccordionButton";
import SearchBar, { type FilterCategoriesType } from "./SearchBar";

interface ReactTableProps<T extends object> {
  id: string;
  data: T[];
  columns: any;
  filterCategories: FilterCategoriesType[];
}

const MainTable = <T extends object>({
  id,
  data,
  columns,
  filterCategories,
}: ReactTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // todo: move pagination state to context close to useQuery if going with server side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    manualPagination: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  const firstRow =
    table.getState().pagination.pageSize *
    table.getState().pagination.pageIndex;
  const lastRow = firstRow + table.getState().pagination.pageSize;

  const startRowIndex = pageIndex * pageSize;
  const endRowIndex = Math.min(
    (pageIndex + 1) * pageSize,
    table.getRowModel().rows.length,
  );

  const filters = useMemo(
    () => ["checkbox", "images", "orderId", "requestId", "actions"],
    [],
  );

  return (
    <div className="flex flex-col gap-[20px]">
      <SearchBar
        id={id}
        searchValue={globalFilter}
        setSearchState={(value) => setGlobalFilter(value)}
        filterCategories={filterCategories}
        rowCount={table.getFilteredRowModel().rows.length}
      />

      <div className="flex h-[calc(100vh-382px)] w-full flex-col gap-[10px] rounded-[20px] bg-white p-[10px] sm:h-[calc(100vh-317px)] md:h-[calc(100vh-286px)] md:p-[20px]">
        {table.getRowModel().rows.length > 0 ? (
          <>
            <div className="h-full overflow-auto">
              <table className="relative hidden w-max min-w-full md:table">
                <thead className="title-sm sticky top-0 z-10 bg-white font-medium text-neutral-900">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="border-0">
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none flex gap-[10px]"
                                  : "flex items-center",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {header.column.getCanSort() && (
                                <ArrowSwapVertical
                                  className="self-end text-neutral-500"
                                  size="20"
                                />
                              )}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
                  {table
                    .getRowModel()
                    .rows.slice(startRowIndex, endRowIndex)
                    .map((row) => (
                      <tr
                        key={row.id}
                        className="bg-gray-10 px-[20px] py-[20px]"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td className="border-0" key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* mobile table */}
              <table className="relative w-max min-w-full md:hidden">
                <thead className="title-sm sticky top-0 z-20 bg-white font-medium text-neutral-900">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers
                        .filter((header) => filters.includes(header.column.id))
                        .map((header) => (
                          <th key={header.id} className="border-0 p-[8px]">
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none flex gap-[10px]"
                                    : "flex items-center",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                                {header.column.getCanSort() && (
                                  <ArrowSwapVertical
                                    className="self-end text-neutral-500"
                                    size="20"
                                  />
                                )}
                              </div>
                            )}
                          </th>
                        ))}
                      <th className="border-0 p-[8px]">
                        {/* placeholder for accordion */}
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody className="border-y-[1px] border-gray-500 [&>tr]:border-b-[1px] [&>tr]:border-gray-500 last:[&>tr]:border-b-0">
                  {table
                    .getRowModel()
                    .rows.slice(startRowIndex, endRowIndex)
                    .map((row) => {
                      return (
                        <TableRow
                          key={row.id}
                          row={row}
                          filters={filters}
                          columns={columns}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="body-lg flex flex-col items-center gap-[20px] px-[10px] py-[10px] md:flex-row">
              <div className="flex w-full items-center gap-[12px] md:w-max">
                <span className="whitespace-nowrap">Items per page:</span>
                <div className="w-[150px] md:w-[100px]">
                  <SelectNumber
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full gap-[20px]">
                <span>
                  {firstRow + 1}-
                  {lastRow > table.getRowModel().rows.length
                    ? table.getRowModel().rows.length
                    : lastRow}{" "}
                  of {table.getRowModel().rows.length}
                </span>
                <div className="flex gap-[10px]">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="btn relative flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
                  >
                    <ArrowSquareLeft
                      className={
                        table.getCanPreviousPage()
                          ? "text-primary-600"
                          : "text-gray-200"
                      }
                    />
                  </button>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="btn relative flex h-fit w-fit items-center justify-center rounded-[6.25rem] hover:bg-surface-300 focus:bg-surface-400"
                  >
                    <ArrowSquareRight
                      className={
                        table.getCanNextPage()
                          ? "text-primary-600"
                          : "text-gray-200"
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="title-lg md:title-lg flex h-full w-[1040px] items-center justify-center gap-[10px] break-words">
            <Balancer>
              Not Found: <span className="text-gray-500">{globalFilter}</span>
            </Balancer>
          </div>
        )}
      </div>
    </div>
  );
};

type TableRowProps<T> = {
  row: Row<T>;
  filters: string[];
  columns: ColumnDef<T>[];
};

const TableRow = <T extends object>({
  row,
  filters,
  columns,
}: TableRowProps<T>) => {
  const { open, toggle } = useAccordion(false);

  return (
    <Fragment>
      <tr className="relative bg-gray-10">
        {row
          .getVisibleCells()
          .filter((cell) => filters.includes(cell.column.id))
          .map((cell) => (
            <td key={cell.id} className="border-0 p-[8px]">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}

        <td className="border-0 p-[8px]">
          <AccordionButton open={open} toggle={toggle} />
        </td>

        {open && (
          <td className="absolute left-0 top-[76px] z-10 w-full overflow-auto border-0 border-b border-gray-500 bg-gray-10 p-0">
            <SubTable data={[row.original]} columns={columns} />
          </td>
        )}
      </tr>
      {open && (
        <tr>
          <td className="border-0 p-[8px]">
            <div className="mb-[96px]"></div>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

type SelectNumberProps = {
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const SelectNumber = ({ value, onChange }: SelectNumberProps) => {
  const values = useMemo(() => [5, 10, 20, 30], []);

  return (
    <div className="relative z-0 w-full">
      <select
        name="pageNumber"
        id="pageNumber"
        value={value}
        onChange={onChange}
        className="peer relative block h-[45px] w-full overflow-x-auto rounded-[20px] border border-gray-500 bg-neutral-10 px-4 py-2 leading-5 focus:border-2 focus:border-primary-600 focus:outline-none focus:ring-0 md:h-14"
      >
        {values.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

interface SubTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

const SubTable = <T extends object>({ data, columns }: SubTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const filters = useMemo(
    () => ["checkbox", "images", "orderId", "actions"],
    [],
  );

  return (
    <table className="relative w-max min-w-full bg-[#EBE0E859]">
      <thead className="title-sm sticky top-0 z-10 font-medium text-neutral-900">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers
              .filter((header) => !filters.includes(header.column.id))
              .map((header) => (
                <th key={header.id} className="border-0">
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </>
                  )}
                </th>
              ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row
              .getVisibleCells()
              .filter((cell) => !filters.includes(cell.column.id))
              .map((cell) => (
                <td key={cell.id} className="border-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
