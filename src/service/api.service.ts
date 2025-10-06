import { Employee, EmployeesResponse, User } from "@/types/personal";
import { createApiClient } from "./api-client.service";
import { URLS } from "@/utils/service";
import { buildEmployeesParamUrl } from "@/utils/api";

const apiClient = createApiClient();
export const apiRebu = {
  async createPersonal(user: User) {
    try {
      const { data } = await apiClient.post(`${URLS.PERSONAL}`, user);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al cetrar usuario");
    }
  },

  async deletePersonal(userId: string) {
    try {
      const { data } = await apiClient.delete(`${URLS.PERSONAL}/${userId}`);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  },

  async getEmployeeById(employeeId: string) {
    try {
      const { data } = await apiClient.get(`/api/employees/${employeeId}`);
      return data;
    } catch (error: any) {
      console.error("Axios error:", error);
      throw error;
    }
  },

  async updateEmployeeById(employeeId: string, employee: Employee) {
    try {
      const { data } = await apiClient.put(
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
      const { data } = await apiClient.get<EmployeesResponse>(
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
  ): Promise<any> {
    console.log("*********** GET PERSONAL TOTAL************");
    const url = buildEmployeesParamUrl({ searchTerm, sector, country });
    try {
      const { data } = await apiClient.get<{ total: number }>(
        `/api/employees/total${url}`
      );
      return data.total;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  },
};
