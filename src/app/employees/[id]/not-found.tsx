import React from "react";
import Link from "next/link";
import UsersLayout from "@/components/layout/UsersLayout";
import { Button } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <UsersLayout title="Error">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Empleado no encontrado
          </h1>
          <p className="text-gray-600">
            El empleado que buscas no existe o ha sido eliminado.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/employees">
            <Button color="green" className="rounded-md py-5 cursor-pointer">← Volver a la lista de empleados</Button>
          </Link>

          <div className="text-sm text-gray-500 mt-5">
            <p>Verifica que el ID del empleado sea correcto.</p>
          </div>
        </div>
      </div>
    </UsersLayout>
  );
}
