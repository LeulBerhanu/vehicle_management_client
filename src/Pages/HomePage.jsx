import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listVehiclesAPI } from "../APIservices/vehiclesAPI";
import DataTable from "@/components/DataTable/DataTable";
import { getVehicleColumns } from "@/components/DataTable/VehiclesColumns";
import TableSkeleton from "@/components/loader/TableSkeleton";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read query parameters from the URL
  const defaultGlobalFilter = searchParams.get("filter") || "";
  const defaultSorting = JSON.parse(searchParams.get("sorting") || "[]");
  const defaultPageIndex = parseInt(searchParams.get("pageIndex")) || 0;
  const defaultPageSize = parseInt(searchParams.get("pageSize")) || 10;

  const [pagination, setPagination] = useState({
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
  });
  const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
  const [sorting, setSorting] = useState(defaultSorting);

  const query = { pagination, filter: globalFilter, sorting };

  const { data, isLoading } = useQuery({
    queryKey: ["vehicles", query],
    queryFn: () => listVehiclesAPI(query),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const params = {};

    if (globalFilter) {
      params.filter = globalFilter;
    }
    if (sorting.length) {
      params.sorting = JSON.stringify(sorting);
    }
    if (pagination.pageIndex !== 0) {
      params.pageIndex = pagination.pageIndex;
    }

    if (pagination.pageSize !== 10) {
      params.pageSize = pagination.pageSize;
    }

    setSearchParams(params);
  }, [pagination, globalFilter, sorting, setSearchParams]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: 0,
    }));
  }, [globalFilter]);

  if (isLoading) return <TableSkeleton />;
  return (
    <div>
      {data && (
        <DataTable
          columns={getVehicleColumns(navigate)}
          data={data}
          pagination={pagination}
          setPagination={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
    </div>
  );
};

export default HomePage;
