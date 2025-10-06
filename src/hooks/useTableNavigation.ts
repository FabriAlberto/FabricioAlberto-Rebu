"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Status } from "@/types/personal";

export const useTableNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const updateParams = (
    updates: Record<string, string | string[] | undefined>
  ) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key); 
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined && value !== "" && value.trim() !== "") {
        params.set(key, value);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSort = (sortField: string, sortOrder: "asc" | "desc") => {
    updateParams({
      sort: sortField,
      order: sortOrder,
      page: "1",
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const handleSearch = (query: string) => {
    updateParams({
      query,
      page: "1",
    });
  };

  const handleLimitChange = (limit: number) => {
    updateParams({
      limit: limit.toString(),
      page: "1",
    });
  };
  const handleChangeStatus = (status: Status) => {
    updateParams({
      status,
    });
  };
  const removeFilters = () => {
    updateParams({
      status: undefined,
      query: undefined,
      sector:undefined,
      country:undefined
    });
  };
  return {
    searchParams,
    updateParams,
    handleSort,
    handlePageChange,
    handleSearch,
    handleLimitChange,
    handleChangeStatus,
    removeFilters,
  };
};
