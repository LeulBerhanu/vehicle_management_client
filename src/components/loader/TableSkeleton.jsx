import React from "react";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="space-y-3 mt-4">
      <Skeleton className="w-full h-[60px] mb-2" />
      <Skeleton className="w-full h-[35px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
      <Skeleton className="w-full h-[40px]" />
    </div>
  );
};

export default TableSkeleton;
