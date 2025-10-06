import React from "react";
import { notFound, redirect } from "next/navigation";
import UsersLayout from "@/components/layout/UsersLayout";
import NewEmployeeForm from "@/components/newEmployee/NewEmployeeForm";
import { apiRebu } from "@/service/api.service";

interface EditUserPageProps {
  params: {
    id: string;
  };
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  try {
    const employee = await apiRebu.getEmployeeById(params.id);
    return (
      <UsersLayout title="Editar Empleado">
        <div className="mt-4">
          <NewEmployeeForm
            defaultValues={{
              ...employee,
              monthlySalary: `${employee.monthlySalary}`,
            }}
            isEdit
          />
        </div>
      </UsersLayout>
    );
  } catch (error: any) {
    const statusCode = error.response?.status;
    if (statusCode === 404) {
      notFound();
    }
    redirect("/employees");
  }
};

export default EditUserPage;
