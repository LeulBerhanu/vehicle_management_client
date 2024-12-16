import { ChevronDown, ChevronUp } from "lucide-react";

const DataTableColumnHeader = ({ column, title }) => {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <span className="ml-2 h-4 w-4"></span>
      )}
    </div>
  );
};

export default DataTableColumnHeader;
