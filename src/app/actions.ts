"use server";

import { apiRebu } from "@/service/api.service";
import { Employee } from "@/types/personal";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createEmployeeAction(employee: Omit<Employee, "id">) {
  try {
    const data = await apiRebu.createEmployee(employee);

    revalidatePath("/employees");
    revalidatePath(`/employees/${data.id}`);

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

    // Revalidar cache con tags específicos
    revalidateTag("employees");
    revalidateTag(`employee-${employeeId}`);
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

    // Revalidar cache con tags específicos
    revalidateTag("employees");
    revalidateTag("employees-total");
    revalidateTag(`employee-${employeeId}`);
    revalidatePath(`/employees/${employeeId}`);
    revalidatePath("/employees");

    return { success: true, message: "Empleado eliminado correctamente" };
  } catch (err) {
    console.error("Error eliminando empleado:", err);
    throw new Error("Error al eliminar el empleado");
  }
}
