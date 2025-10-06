"use client";
import React, { FC, useState } from "react";
import { Employee } from "@/types/personal";
import { useToast } from "@/context/ToastContext";
import { AlertDialog } from "radix-ui";
import { Button, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
type Props = {
  employee: Employee;
};
const RemoveUserButton: FC<Props> = ({ employee }) => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  const accept = async () => {
    try {
      /* await deleteUserAction(employee.id); */
      showToast({
        severity: "success",
        summary: "Eliminado",
        detail: `Usuario "${employee.fullName}" eliminado con éxito.`,
        life: 3000,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      showToast({
        severity: "error",
        summary: "Error",
        detail: `Ocurrio un error al intentar eliminar el usuario, por favor intente nuevamente más tarde.`,
        life: 3000,
      });
    }
  };
  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger asChild>
          <IconButton 
            variant="soft"
            color="crimson"
            className="cursor-pointer text-red-500 hover:text-red-600"
          >
            <TrashIcon fontSize="20px" />
          </IconButton >
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-xl">
            <AlertDialog.Title className="text-lg font-semibold">
              Eliminar usuario
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-gray-600">
              Estas seguro de eliminar el usuario "{employee.fullName}"?
            </AlertDialog.Description>
            <div className="mt-4 flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <Button className=" cursor-pointer rounded px-3 py-1 " color="gray" type="reset">
                  Cancelar
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  onClick={accept}
                  color="red"
                  className="rounded px-3 py-1 cursor-pointer "
                >
                  Eliminar
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default RemoveUserButton;
