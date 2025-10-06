import { employeesColItems } from "@/utils/home/items";
import React from "react";
import { Table, Skeleton, ScrollArea } from "@radix-ui/themes";

type Props = {
  limit: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};

const TableSkeleton = ({ limit }: Props) => {
  const rows = Array.from({ length: limit }, (_, i) => i);
  return (
    <div className="w-full mt-4">
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        style={{ maxHeight: "65vh" }}
      >
        <Table.Root variant="surface" size="2">
          <Table.Header>
            <Table.Row>
              {employeesColItems.map((col) => (
                <Table.ColumnHeaderCell key={col.field} className="h-[53px]">
                  {col.header}
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell align="center" className="h-[53px]">
                Acciones
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((i) => (
              <Table.Row key={i}>
                {employeesColItems.map((col) => (
                  <Table.Cell key={col.field} style={{ height: "53px" }}>
                    <Skeleton>
                      <div style={{ height: 16, width: "70%" }} />
                    </Skeleton>
                  </Table.Cell>
                ))}
                <Table.Cell align="center" style={{ height: "53px" }}>
                  <Skeleton>
                    <div style={{ height: 16, width: 80 }} />
                  </Skeleton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </ScrollArea>
    </div>
  );
};

export default TableSkeleton;
