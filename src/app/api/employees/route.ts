import { NextRequest, NextResponse } from "next/server";
import { Employee, EmployeesResponse } from "@/types/personal";
import { database } from "@/utils/database";

export async function GET(req: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let employees: Employee[] = await database.getEmployees();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortField = searchParams.get("sortField") || "";
  const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc";
  const sector = searchParams.get("sector");
  const country = searchParams.get("country");
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    employees = employees.filter(
      (emp) =>
        emp.fullName.toLowerCase().includes(term) ||
        emp.corporateEmail.toLowerCase().includes(term) ||
        emp.sector.toLowerCase().includes(term)
    );
  }

  if (sector) {
    const depArray = sector.split(",");
    employees = employees.filter((emp) =>
      depArray.includes(emp.sector.toString())
    );
  }

  if (country) {
    const countryArray = country.split(",");
    employees = employees.filter((emp) => countryArray.includes(emp.country));
  }

  if (sortField) {
    employees = employees.sort((a: any, b: any) => {
      let valueA = a[sortField as keyof Employee];
      let valueB = b[sortField as keyof Employee];

      if (sortField === "admisionDate") {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const total = employees.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = employees.slice(start, end);
  const response: EmployeesResponse = {
    employees: paginated,
    total,
    page,
    limit,
  };

  return NextResponse.json(response, { status: 200 });
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newEmployee = await database.createEmployee({
      fullName: body.fullName,
      corporateEmail: body.corporateEmail,
      sector: body.sector,
      admisionDate: body.admisionDate,
      monthlySalary: body.monthlySalary,
      country: body.country
    });
  
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}