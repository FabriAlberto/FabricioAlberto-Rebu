"use client";
import RHFInput from "@/components/common/RhfInput";
import RHFSelect from "@/components/common/RhfSelect";
import {  EmployeeForm } from "@/types/personal";
import React, { FC, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectors } from "@/mock/sector";
import { countriesMock } from "@/mock/countries";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { newEmployeeSchema } from "@/schemas/new-employee.schema";
import z from "zod";
import { useToast } from "@/context/ToastContext";

type Props = {
  defaultValues: EmployeeForm;
  isEdit?: boolean;
};
type FormValue = z.infer<typeof newEmployeeSchema>;

const NewEmployeeForm: FC<Props> = ({ defaultValues, isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(newEmployeeSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,   
    formState: { isDirty, isValid, errors },
  } = methods;
  console.log(errors);
  useEffect(() => {
    // hacemos foco en el primer input
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const onSubmit = async (data: FormValue) => {
    console.log(data);
    setIsLoading(true);
    try {
      showToast({
        severity: "success",
        summary: "Excelente",
        detail: "Empleado creado con éxito",
      });
    } catch (error) {
      console.log(error);
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Ha ocurrido un error al eliminar el empleado",
      });
    }
    setIsLoading(false);
  };

  return (
    <section className="mt-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RHFInput
                name="fullName"
                label="Nombre completo"
                disabled={isEdit}
                isRequired
                className="w-full"
                ref={inputRef}
              />

              <RHFInput
                name="corporateEmail"
                label="Correo corporativo"
                isRequired
                placeholder="user@empresa.com"
                className="w-full"
              />

              <RHFSelect
                name="sector"
                label="Departamento"
                isRequired
                placeholder="Seleccionar el departamento"
                className="w-full py-0"
                options={sectors.map((s) => ({ label: s, value: s }))}
              />

              <RHFSelect
                name="country"
                label="País"
                isRequired
                placeholder="Seleccionar el país"
                className="w-full"
                options={countriesMock.map((c) => ({ label: c, value: c }))}
              />

              <RHFInput
                name="admisionDate"
                label="Fecha de admisión"
                type="date"
                isRequired
                className="w-full"
              />

              <RHFInput
                name="monthlySalary"
                label="Salario mensual"
                isRequired
                className="w-full"
              />
            </div>
          </section>
          <div className="w-full flex justify-end gap-3 mt-4">
            <Link href={"/employees"}>
              <Button
                disabled={isLoading}
                color="gray"
                className="rounded-md p-5"
              >
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              color="green"
              className="rounded-md p-5"
              disabled={isLoading || !isValid || (!isDirty && isEdit)}
            >
              {isLoading ? "Cargando..." : isEdit ? "Guardar cambios" : "Crear"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default NewEmployeeForm;
