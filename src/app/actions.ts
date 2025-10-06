"use server";

import { apiRebu } from "@/service/api.service";
import { Employee, /* , Employee */ } from "@/types/personal";
import { revalidatePath } from "next/cache";


// Actions específicas para empleados
export async function updateEmployeeAction(employeeId: string, employee: Employee) {
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
    await apiRebu.deletePersonal(employeeId);
    revalidatePath(`/employees/${employeeId}`);
    revalidatePath("/employees");
    return { success: true, message: "Empleado eliminado correctamente" };
  } catch (err) {
    console.error("Error eliminando empleado:", err);
    throw new Error("Error al eliminar el empleado");
  }
}

