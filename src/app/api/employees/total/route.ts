import { NextRequest, NextResponse } from "next/server";
import { Employee } from "@/types/personal";
import { database } from "@/utils/database";

export async function GET(req: NextRequest) {
  let employees: Employee[] = await database.getEmployees()
  const { searchParams } = new URL(req.url);

  const searchTerm = searchParams.get("searchTerm") || "";
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
    employees = employees.filter((emp) => depArray.includes(emp.sector));
  }

  if (country) {
    const countryArray = country.split(",");
    employees = employees.filter((emp) => countryArray.includes(emp.country));
  }
  const total = employees.length;
  
  return NextResponse.json({ total }, { status: 200 });
}
