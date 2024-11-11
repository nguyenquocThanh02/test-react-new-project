import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed" | "completed";
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
    {
      id: "4c5e8321",
      amount: 150,
      status: "pending",
      email: "john.doe@example.com",
    },
    {
      id: "31b45ed6",
      amount: 200,
      status: "pending",
      email: "alice.smith@example.com",
    },
    {
      id: "d71fc72a",
      amount: 250,
      status: "completed",
      email: "bob.jones@example.com",
    },
    {
      id: "b7ff4399",
      amount: 75,
      status: "failed",
      email: "carol.white@example.com",
    },
    {
      id: "f98403d5",
      amount: 300,
      status: "processing",
      email: "david.brown@example.com",
    },
    {
      id: "d091a2bc",
      amount: 180,
      status: "pending",
      email: "emma.green@example.com",
    },
    {
      id: "64ab9e8f",
      amount: 95,
      status: "completed",
      email: "frank.miller@example.com",
    },
    {
      id: "91c3461a",
      amount: 220,
      status: "failed",
      email: "grace.johnson@example.com",
    },
    {
      id: "6a3f5b9d",
      amount: 160,
      status: "processing",
      email: "hannah.white@example.com",
    },
    {
      id: "7b08fe54",
      amount: 110,
      status: "pending",
      email: "isla.carter@example.com",
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
      // header: ({ column }) => {
      //   const handelSortAmount = () => {
      //     console.log();
      //     column.toggleSorting(column.getIsSorted() === "asc");
      //   };
      //   return (
      //     <Button onClick={handelSortAmount}>
      //       Amount
      //       <ArrowUpDown />
      //     </Button>
      //   );
      // },
      header: "Amount",
      cell: ({ row }) => {
        console.log("check:", row.original);
        return <div>{row.getValue("amount")} times</div>;
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
