import { Employee, EmployeesResponse } from "@/types/personal";
import { createApiClient} from "./api-client.service";
import { buildEmployeesParamUrl } from "@/utils/api";

export const apiRebu = {
  async createEmployee(employee: Omit<Employee, "id">) {
    try {
      const { data } = await createApiClient().post(`/api/employees`, employee);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear usuario");
    }
  },

  async deleteEmployee(employeeId: string) {
    try {
      const { data } = await createApiClient().delete(`/api/employees/${employeeId}`);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  },

  async getEmployeeById(employeeId: string):Promise<Employee> {
    try {
      const { data } = await createApiClient().get(`/api/employees/${employeeId}`);
      return data;
    } catch (error: any) {
      console.error("Axios error:", error);
      throw error;
    }
  },

  async updateEmployeeById(employeeId: string, employee: Employee) {
    try {
      const { data } = await createApiClient().put(
        `/api/employees/${employeeId}`,
        employee
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  },

  async getEmployees(
    page: string,
    limit: string,
    searchTerm?: string,
    sortField?: string,
    sortOrder?: "asc" | "desc",
    sector?: string[],
    country?: string[]
  ): Promise<EmployeesResponse> {
    const url = buildEmployeesParamUrl({
      page,
      limit,
      searchTerm,
      sortField,
      sortOrder,
      sector,
      country,
    });
    console.log(url);
    try {
      const { data } = await createApiClient().get<EmployeesResponse>(
        `/api/employees${url}`
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching employees");
    }
  },
  async getTotalEmployees(
    searchTerm?: string,
    sector?: string[],
    country?: string[]
  ) {
    console.log("*********** GET PERSONAL TOTAL************");
    const url = buildEmployeesParamUrl({ searchTerm, sector, country });
    try {
      const { data } = await createApiClient().get<{ total: number }>(
        `/api/employees/total${url}`
      );
      return data.total;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  },
};
