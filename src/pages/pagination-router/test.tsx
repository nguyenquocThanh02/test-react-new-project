import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { count } from "console";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
const PaginationRouter = () => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "status",
      header: () => <div className="">Status</div>,
      cell: ({ row }) => (
        <div className="">{row.getValue("status")} render</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        const handelSortAmount = () => {
          console.log();
          column.toggleSorting(column.getIsSorted() === "asc");
        };
        return (
          <Button onClick={handelSortAmount}>
            Amount
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        console.log("check:", row.original);
        return <div>{row.getValue("amount")} times</div>;
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    // getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // state: {
    //   sorting,
    // },
  });

  table.getHeaderGroups().map((header) => {
    console.log("hd: ", header);
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((header, index) => (
            <TableRow key={index}>
              {header.headers.map((h, i) => (
                <TableHead key={i}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow key={i}>
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell key={i}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <div>No result</div>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationRouter;
