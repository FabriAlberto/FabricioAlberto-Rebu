export type EmployeesApiParams = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  sector?: string[];
  country?: string[];
};

export function buildEmployeesParamUrl({
  limit,
  page,
  country,
  searchTerm,
  sector,
  sortField,
  sortOrder,
}: EmployeesApiParams): string {
  const params = new URLSearchParams({
    page: page || "1",
    limit: limit || "10",
    ...(searchTerm ? { searchTerm } : {}),
    ...(sortField ? { sortField } : {}),
    ...(sortOrder ? { sortOrder } : {}),
  });

  sector?.forEach((d) => params.append("sector", d));
  country?.forEach((c) => params.append("country", c));

  return `?${params.toString()}`;
}
export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Cliente → usa fetch relativo
    return "";
  }

  // Servidor → necesita absoluto
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE
    ? `${process.env.NEXT_PUBLIC_URL_BASE}`
    : "http://localhost:3000";

  return baseUrl;
};
