import React from "react";
import UsersLayout from "@/components/layout/UsersLayout";
import NewEmployeeForm from "@/components/newEmployee/NewEmployeeForm";

const NewUserPage = () => {
  return (
    <UsersLayout title="Crear empleado">
      <div>
        <NewEmployeeForm
          defaultValues={{
            admisionDate: "",
            corporateEmail: "",
            country: "",
            fullName: "",
            id: 0,
            monthlySalary:"0",
            sector: "",
          }}
        />
      </div>
    </UsersLayout>
  );
};

export default NewUserPage;
