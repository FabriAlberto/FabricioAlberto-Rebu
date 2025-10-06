import React from "react";
import { apiRebu } from "@/service/api.service";
import EmployeeTableClient from "./EmployeeTableClient";

export const revalidate = 60 * 60 * 24;

type Props = {
  query?: string;
  currentPage: string;
  limit: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  sector?: string[];
  country?: string[];
};
//Usamos este server component solo para poder obtener la información desde el servidor y aprovechar el suspense + fallback
export default async function EmployeeTable({
  query,
  currentPage,
  limit,
  sortField,
  sortOrder,
  sector,
  country,
}: Props) {
  const response = await apiRebu.getEmployees(
    currentPage,
    limit,
    query,
    sortField,
    sortOrder,
    sector,
    country
  );
  return <EmployeeTableClient employees={response.employees} />;
}
