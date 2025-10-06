export type User = {
  id: string;
  usuario: string;
  sector: number;
  estado: Status;
};

export type Pagination = {
  limit?: number;
  page?: number;
};




export enum Status {
  ACTIVE = "ACTIVO",
  INACTIVE = "INACTIVO",
}
export type FormUser = {
  id: string;
  usuario: string;
  sector: number;
  estado: Status | string;
};

export type Employee = {
  id: number;
  fullName: string;
  corporateEmail: string;
  sector: string;
  admisionDate: string;
  monthlySalary: number;
  country: string;
};
export type EmployeeForm = Omit<Employee, "monthlySalary"> & {
  monthlySalary: string;
};

export enum Sector {
  ENGINEERING = "Engineering",
  SALES = "Sales",
  HT = "HR",
  OPERATIONS = "Operations",
}
export type EmployeeTableColItem = {
  field: keyof Employee;
  header: string;
  sortable: boolean;
};
export type EmployeesResponse = {
  employees: Employee[];
  total: number;
  page: number;
  limit: number;
};
