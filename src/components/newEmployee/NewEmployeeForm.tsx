"use client";
import RHFInput from "@/components/common/RhfInput";
import RHFSelect from "@/components/common/RhfSelect";
import { EmployeeForm } from "@/types/personal";
import React, { FC, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectors } from "@/mock/sector";
import { countriesMock } from "@/mock/countries";
import { Button } from "@radix-ui/themes";
import { newEmployeeSchema } from "@/schemas/new-employee.schema";
import z from "zod";
import { useToast } from "@/context/ToastContext";
import { createEmployeeAction, updateEmployeeAction } from "@/app/actions";
import { useFormDraft } from "@/hooks/useFormDraft";
import { useRouter } from "next/navigation";

type Props = {
  defaultValues: EmployeeForm;
  isEdit?: boolean;
};
type FormValue = z.infer<typeof newEmployeeSchema>;

const NewEmployeeForm: FC<Props> = ({ defaultValues, isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const router = useRouter();
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(newEmployeeSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid },
  } = methods;
  const formValues = watch();

  const { clearDraft } = useFormDraft({
    key: "employee-form",
    isEdit,
    reset,
    formValues,
    isDirty,
  });

  useEffect(() => {
    // Hacer foco en el primer input
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const onSubmit = async (data: FormValue) => {
    setIsLoading(true);

    try {
      if (isEdit) {
        await updateEmployeeAction(defaultValues.id?.toString() || "", {
          id: defaultValues.id,
          ...data,
        });
        showToast({
          severity: "success",
          summary: "Empleado actualizado",
          detail: "El empleado ha sido actualizado correctamente",
        });
        router.push(`/employees/${defaultValues.id}`);
        clearDraft();
      } else {
        await createEmployeeAction(data);
        showToast({
          severity: "success",
          summary: "Empleado creado",
          detail: "El empleado ha sido creado correctamente",
        });
        clearDraft();
        reset(defaultValues);
        router.push(`/employees`);
      }
    } catch (error) {
      console.error("Error al procesar empleado:", error);
      showToast({
        severity: "error",
        summary: "Error",
        detail: isEdit
          ? "Ha ocurrido un error al actualizar el empleado"
          : "Ha ocurrido un error al crear el empleado",
      });
    }

    setIsLoading(false);
  };
  const onCancel = () => {
    clearDraft();
    router.push("/employees");
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
          <div className="w-full flex gap-3 justify-end items-center mt-4">
            <Button
              disabled={isLoading}
              color="gray"
              className="rounded-md p-5"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </Button>
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
