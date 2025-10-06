import { employeesMock } from "@/mock/employees";
import { Employee } from "@/types/personal";
import { unstable_cache } from "next/cache";

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 100));

// Cache persistente para empleados
const getCachedEmployees = unstable_cache(
  async () => [...employeesMock],
  ['employees-data'],
  { 
    tags: ['employees'],
    revalidate: false // No expira automáticamente
  }
);

let employeesCache: Employee[] = [];

// Función para inicializar cache
async function initializeCache() {
  if (employeesCache.length === 0) {
    employeesCache = await getCachedEmployees();
  }
}

export const database = {
  async getEmployees(): Promise<Employee[]> {
    await initializeCache();
    await simulateApiDelay();
    return employeesCache;
  },

  async getEmployeeById(id: number): Promise<Employee | null> {
    await initializeCache();
    await simulateApiDelay();
    return employeesCache.find(emp => emp.id === id) || null;
  },

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    await initializeCache();
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