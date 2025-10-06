import { database } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

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
