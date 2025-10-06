import { Employee } from "@/types/personal";
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/employees.json');

async function saveEmployees(employees: Employee[]): Promise<void> {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2));
  } catch (error) {
    console.error('Error saving employees:', error);
    throw new Error('Failed to save employees');
  }
}

export const database = {
  // Leer todos los empleados
  async getEmployees(): Promise<Employee[]> {
    try {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading employees:', error);
      return [];
    }
  },

  // Obtener empleado por ID
  async getEmployeeById(id: number): Promise<Employee | null> {
    const employees = await this.getEmployees();
    return employees.find(emp => emp.id === id) || null;
  },

  // Crear nuevo empleado
  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const employees = await this.getEmployees();
    const newId = Math.max(...employees.map(emp => emp.id), 0) + 1;
    
    const newEmployee: Employee = {
      id: newId,
      ...employee
    };

    employees.push(newEmployee);
    await saveEmployees(employees);
    
    return newEmployee;
  },

  // Actualizar empleado
  async updateEmployee(id: number, updatedEmployee: Partial<Employee>): Promise<Employee | null> {
    const employees = await this.getEmployees();
    const index = employees.findIndex(emp => emp.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedEmp = { ...employees[index], ...updatedEmployee };
    employees[index] = updatedEmp;
    
    await saveEmployees(employees);
    return updatedEmp;
  },

  // Eliminar empleado
  async deleteEmployee(id: number): Promise<boolean> {
    const employees = await this.getEmployees();
    const filteredEmployees = employees.filter(emp => emp.id !== id);
    
    if (filteredEmployees.length === employees.length) {
      return false; 
    }

    await saveEmployees(filteredEmployees);
    return true;
  },

  // Obtener total de empleados
  async getTotalEmployees(): Promise<number> {
    const employees = await this.getEmployees();
    return employees.length;
  }
};


