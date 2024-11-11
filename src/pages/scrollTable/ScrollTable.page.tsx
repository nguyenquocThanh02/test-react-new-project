import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function ScrollTablePage() {
  return (
    <ScrollArea className="w-full max-w-3xl overflow-x-auto">
      <Table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
              Name
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
              Role
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-red-100 dark:bg-red-800">
            <TableCell className="px-6 py-4 whitespace-nowrap">
              John Doe
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Manager
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              john.doe@example.com
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Active
            </TableCell>
          </TableRow>
          <TableRow className="bg-green-100 dark:bg-green-800">
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Jane Smith
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Developer
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              jane.smith@example.com
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Inactive
            </TableCell>
          </TableRow>
          <TableRow className="bg-blue-100 dark:bg-blue-800">
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Bob Johnson
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Designer
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              bob.johnson@example.com
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              Active
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
