import React from "react";
import { notFound } from "next/navigation";
import UsersLayout from "@/components/layout/UsersLayout";
import EmployeeDetails from "@/components/employee/EmployeeDetails";
import { apiRebu } from "@/service/api.service";

/* export const revalidate = 60;
export const dynamicParams = true;
export async function generateStaticParams() {
  try {
    const employees = await database.getEmployees();
    return employees.map((employee: Employee) => ({
      id: employee.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
 */
interface EmployeePageProps {
  params: {
    id: string;
  };
}

const EmployeePage = async ({ params }: EmployeePageProps) => {
  try {
    const employee = await apiRebu.getEmployeeById(params.id);
    if (!employee) throw new Error();
    return (
      <UsersLayout title="Detalles del Empleado">
        <EmployeeDetails employee={employee} />
      </UsersLayout>
    );
  } catch (error: any) {
    console.log(error);
    notFound();
  }
};

export default EmployeePage;
