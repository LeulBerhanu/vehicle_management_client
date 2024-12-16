import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteDialog } from "../DeleteDialog";
import { format } from "date-fns";

export const getVehicleColumns = (navigate) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Name" />;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Status" />;
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Updated At" />;
      },
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        return (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-default hover:opacity-70">
                  {format(date, "dd MMM yyyy")}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <span>{format(date, "EEE hh:mm:ss a")}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:opacity-85 transition-all duration-300"
                    onClick={() =>
                      navigate(`update-vehicle/${row.original._id}`)
                    }
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit vehicle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DeleteDialog data={row.original} />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
