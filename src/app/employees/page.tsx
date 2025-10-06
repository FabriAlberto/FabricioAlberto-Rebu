import Filter from "@/components/home/table/filters/Filter";
import TableSkeleton from "@/components/home/table/TableSkeleton";
import { getCachedPersonalTotal } from "@/utils/cache";
import { Suspense } from "react";
import UsersLayout from "@/components/layout/UsersLayout";
import { normalizeToArray } from "@/utils/functions";
import EmployeesTablePaginator from "@/components/home/table/UserTablePaginatorClient";
import { Button } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import EmployeeTable from "@/components/home/table/EmployeeTable";

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    sector?: string | string[];
    country?: string | string[];
  };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || "1";
  const limit = searchParams?.limit || "10";
  const sortField = searchParams?.sort || "";
  const sortOrder = (searchParams?.order as "asc" | "desc") || "asc";
  const sector = normalizeToArray(searchParams?.sector);
  const country = normalizeToArray(searchParams?.country);

  const total = await getCachedPersonalTotal(query, country, sector);
  return (
    <UsersLayout
      title="Empleados"
      actionChildren={
        <Link href={'/employees/new'}>
        <Button color="green" className="rounded-md p-5 cursor-pointer">
          Crear empleado <PlusIcon />{" "}
        </Button>
        </Link>
      }
    >
      <div className="mt-4">
        <Filter />
      </div>
      <Suspense
        key={query + page + limit + sortField + sortOrder + country + sector}
        fallback={
          <TableSkeleton
            limit={Number(limit)}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        }
      >
        <EmployeeTable
          query={query}
          currentPage={page}
          limit={limit}
          sortField={sortField}
          sortOrder={sortOrder}
          sector={sector}
          country={country}
        />
      </Suspense>

      <section className="w-full flex justify-center mt-4">
        <EmployeesTablePaginator totalCount={total} />
      </section>
    </UsersLayout>
  );
}
