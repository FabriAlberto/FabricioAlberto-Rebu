import { EmployeeTableColItem} from "@/types/personal";


export const employeesColItems:EmployeeTableColItem[]=[
  {
    field: "fullName",
    header: "Nombre",
    sortable: true,
  },
  {
    field: "corporateEmail",
    header: "Email",
    sortable: false,
  },
  {
    field: "sector",
    header: "Departamento",
    sortable: false,
  },
  {
    field: "admisionDate",
    header: "Fecha de ingreso",
    sortable: true,
  },
  {
    field: "country",
    header: "País",
    sortable: false,
  },
  {
    field: "monthlySalary",
    header: "Salario",
    sortable: true,
  },
]