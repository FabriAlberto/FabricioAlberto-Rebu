import { NextRequest, NextResponse } from "next/server";
import { database } from "@/utils/database";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const employeeId = parseInt(params.id);

    if (isNaN(employeeId)) {
      return NextResponse.json(
        { error: "ID inválido. Debe ser un número." }, 
        { status: 400 }
      );
    }

    const employee = await database.getEmployeeById(employeeId);

    if (!employee) {
      return NextResponse.json(
        { error: "Empleado no encontrado" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID del empleado es requerido" },
        { status: 400 }
      );
    }

    const updatedEmployee = await database.updateEmployee(id, updateData);

    if (!updatedEmployee) {
      return NextResponse.json(
        { error: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error('Error actualizando el empleado:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

  try {
  
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "ID del empleado es requerido" },
        { status: 400 }
      );
    }

    const employeeId = parseInt(id);
    if (isNaN(employeeId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const deleted = await database.deleteEmployee(employeeId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Empleado eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
