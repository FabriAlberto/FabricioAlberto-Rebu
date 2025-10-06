"use server";

import { apiRebu } from "@/service/api.service";
import { Employee } from "@/types/personal";
import { revalidatePath } from "next/cache";

export async function createEmployeeAction(employee: Omit<Employee, "id">) {
  try {
    await apiRebu.createEmployee(employee);

    revalidatePath("/employees");
    revalidatePath("/employees/[id]", "page");

    return { success: true, message: "Empleado creado correctamente" };
  } catch (err) {
    console.error("Error creando empleado:", err);
    throw new Error("Error al crear el empleado");
  }
}
export async function updateEmployeeAction(
  employeeId: string,
  employee: Employee
) {
  try {
    await apiRebu.updateEmployeeById(employeeId, employee);

    revalidatePath(`/employees/${employeeId}`);
    revalidatePath("/employees");

    return { success: true, message: "Empleado actualizado correctamente" };
  } catch (err) {
    console.error("Error actualizando empleado:", err);
    throw new Error("Error al actualizar el empleado");
  }
}

export async function deleteEmployeeAction(employeeId: string) {
  try {
    await apiRebu.deleteEmployee(employeeId);

    revalidatePath(`/employees/${employeeId}`);
    revalidatePath("/employees");

    return { success: true, message: "Empleado eliminado correctamente" };
  } catch (err) {
    console.error("Error eliminando empleado:", err);
    throw new Error("Error al eliminar el empleado");
  }
}
