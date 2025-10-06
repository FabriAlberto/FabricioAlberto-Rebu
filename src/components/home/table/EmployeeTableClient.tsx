"use client";
import React from "react";
import { Employee } from "@/types/personal";
import { employeesColItems } from "@/utils/home/items";
import { useTableNavigation } from "@/hooks/useTableNavigation";
import RemoveUserButton from "./RemoveUserButton";
import { Table, ScrollArea, Text } from "@radix-ui/themes";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Props = {
  employees: Employee[];
};

const EmployeeTableClient: React.FC<Props> = ({ employees }) => {
  const { searchParams, handleSort } = useTableNavigation();
  const router = useRouter();
  const sort = searchParams.get("sort") || "";
  const order = (searchParams.get("order") as "asc" | "desc") || "asc";

  const handleHeaderClick = (field: string) => {
    if (!field) return;
    const nextOrder: "asc" | "desc" =
      sort === field ? (order === "asc" ? "desc" : "asc") : "asc";
    handleSort(field, nextOrder);
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) return null;
    return order === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />;
  };

  const handleRowClick = (employee: Employee) => {
    router.push(`/employees/${employee.id}`);
  };

  return (
    <div className="w-full mt-4 overflow-x-auto">
      <ScrollArea
        type="auto"
        scrollbars="horizontal"
        className="max-w-screen"
      >
        <Table.Root variant="surface" size="2">
          <Table.Header>
            <Table.Row>
              {employeesColItems.map((col) => (
                <Table.ColumnHeaderCell
                  key={col.field}
                  className="whitespace-nowrap h-[53px]"
                >
                  <button
                    type="button"
                    onClick={() => col.sortable && handleHeaderClick(col.field)}
                    className={`inline-flex items-center gap-2 ${
                      col.sortable ? "hover:opacity-100" : "cursor-default"
                    }`}
                    
                  >
                    <span>{col.header}</span>
                    {col.sortable && getSortIcon(col.field)}
                  </button>
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell align="center" style={{ height: "53px" }}>
                Acciones
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {employees.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={employeesColItems.length + 1}>
                  <div className="px-3 py-6 text-center text-sm text-gray-500">
                    No se encontraron usuarios
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              employees.map((employee) => (
                <Table.Row 
                  key={`${employee.id}-${employee.fullName}`}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleRowClick(employee)}
                >
                  {employeesColItems.map((col) => (
                    <Table.Cell key={col.field} style={{ height: "53px" }}>
                      {col.field === "monthlySalary" ? (
                        <Text>
                          {" "}
                          <span className="text-green-500"> $ </span>
                          {employee.monthlySalary}
                        </Text>
                      ) : (
                        <span>{String(employee[col.field] ?? "")}</span>
                      )}
                    </Table.Cell>
                  ))}
                  <Table.Cell 
                    align="center" 
                    style={{ height: "53px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RemoveUserButton employee={employee} />
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </ScrollArea>
    </div>
  );
};

export default EmployeeTableClient;
