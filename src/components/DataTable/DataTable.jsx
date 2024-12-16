import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import { DeleteMultipleDialog } from "../DeleteMultipleDialog";

const DataTable = ({
  data,
  columns,
  pagination,
  setPagination,
  globalFilter,
  setGlobalFilter,
  sorting,
  setSorting,
}) => {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data?.vehicles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row._id,
    rowCount: data?.pagination.totalItems,
    globalFilterFn: "includesString",
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  return (
    <div>
      <div className="grid grid-cols-3 justify-between py-3  sticky top-0 bg-white z-10 border-b">
        <div className="flex border items-center px-2 rounded-md">
          <Label htmlFor="search" className="cursor-pointer">
            <Search className="size-4" />
          </Label>
          <Input
            className="border-none focus-visible:ring-0"
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            placeholder="Search..."
            id="search"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center">
          Vehicle Management Table
        </h1>
        <div className="flex gap-2 self-end justify-end">
          <DeleteMultipleDialog
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />

          <Button onClick={() => navigate("/add-vehicle")}>
            Add Vehicle <Plus />
          </Button>
        </div>
      </div>
      <div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-3 items-center justify-between  py-4">
          {/* <div className="text-sm text-muted-foreground ">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
          <div className="text-sm text-muted-foreground ">
            <p>Total vehicles: {table.getRowCount()}</p>.
          </div>

          <div className="flex items-center gap-2 justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronFirst />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronLast />
            </Button>
          </div>

          <div className="flex gap-2 justify-end">
            <span className="flex items-center gap-1">
              Go to page:
              <Input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <Select
              value={table.getState().pagination.pageSize}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
