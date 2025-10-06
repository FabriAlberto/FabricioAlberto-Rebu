import React from "react";
import { Employee } from "@/types/personal";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PersonIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  CalendarIcon,
  StarIcon,
  PinTopIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

interface EmployeeDetailsProps {
  employee: Employee;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/employees">
          <Button
            variant="soft"
            color="gray"
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Volver al listado
          </Button>
        </Link>
        <div className="h-6 w-px bg-gray-300" />
        <h1 className="text-2xl font-semibold text-gray-900">
          {employee.fullName}
        </h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <PersonIcon className="size-5" />
                Información Personal
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <PersonIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Nombre completo</p>
                    <p className="font-medium text-gray-900">
                      {employee.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <EnvelopeOpenIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Correo corporativo
                    </p>
                    <p className="font-medium text-gray-900">
                      {employee.corporateEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <HomeIcon className="size-5" />
                Información Laboral
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <HomeIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Departamento</p>
                    <p className="font-medium text-gray-900">
                      {employee.sector}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Fecha de admisión
                    </p>
                    <p className="font-medium text-gray-900">
                      {new Date(employee.admisionDate).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StarIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Salario mensual</p>
                    <p className="font-medium text-gray-900 text-green-600">
                      ${employee.monthlySalary.toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PinTopIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">País</p>
                    <p className="font-medium text-gray-900">
                      {employee.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Link href={`/employees/${employee.id}/edit`}>
          <Button color="green" className="rounded-md cursor-pointer">
            Editar empleado
            <Pencil1Icon className="size-[20px]" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
