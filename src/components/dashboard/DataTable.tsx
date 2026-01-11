import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("glass-panel overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={cn(
                  "text-xs font-medium uppercase tracking-wider text-muted-foreground h-10",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className="border-border/30 hover:bg-muted/30 transition-colors"
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  className={cn("py-3", column.className)}
                >
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
