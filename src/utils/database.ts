import { employeesMock } from "@/mock/employees";
import { Employee } from "@/types/personal";

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 100));

let employeesCache: Employee[] = [...employeesMock];

export const database = {
  async getEmployees(): Promise<Employee[]> {
    await simulateApiDelay();
    return employeesCache;
  },

  async getEmployeeById(id: number): Promise<Employee | null> {
    await simulateApiDelay();
    console.log(employeesCache)
    return employeesCache.find(emp => emp.id === id) || null;
  },

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    await simulateApiDelay();
    
    const newId = Math.max(...employeesCache.map(emp => emp.id), 0) + 1;
    const newEmployee: Employee = {
      id: newId,
      ...employee
    };

    employeesCache.unshift(newEmployee);
    return newEmployee;
  },

  async updateEmployee(id: number, updatedEmployee: Partial<Employee>): Promise<Employee | null> {
    await simulateApiDelay();
    
    const index = employeesCache.findIndex(emp => emp.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedEmp = { ...employeesCache[index], ...updatedEmployee };
    employeesCache[index] = updatedEmp;
    
    return updatedEmp;
  },

  async deleteEmployee(id: number): Promise<boolean> {
    await simulateApiDelay();
    
    const initialLength = employeesCache.length;
    employeesCache = employeesCache.filter(emp => emp.id !== id);
    
    return employeesCache.length < initialLength;
  },

  async getTotalEmployees(): Promise<number> {
    await simulateApiDelay();
    return employeesCache.length;
  },

  async resetData(): Promise<void> {
    employeesCache = [...employeesMock];
  }
};