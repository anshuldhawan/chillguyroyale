import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { DataTablePagination } from "@/components/DataTablePagination";

export function DataTable({ columns, isFetching, table, isPagination }) {
  // console.log('isfetching', isFetching);
  return (
    <div className="w-full h-full lg:h-[25rem] xl:h-full overflow-x-auto">
      <Table>
        <TableHeader className="bg-sky-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-b-sky-600 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
            table.getRowModel().rows.map((row, index) => {
              return (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={`${
                      index % 2 === 0 ? "bg-sky-50" : "bg-sky-100"
                    } hover:bg-sky-200 border-0`}
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
                </React.Fragment>
              );
            })
          ) : isFetching ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="w-full flex justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-sky-700" />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns?.length}
                className="h-24 text-center text-sky-700 font-indieFlower"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isPagination && (
        <div className="mt-2">
          <DataTablePagination
            table={table}
            pageSizeOptions={[5, 10, 20, 30, 50]}
          />
        </div>
      )}
    </div>
  );
}
