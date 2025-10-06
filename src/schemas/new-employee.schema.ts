import { z } from "zod";

export const newEmployeeSchema = z.object({
  /* id: z.number().int().positive(), */

  fullName: z.string().min(3, {
    message: "El nombre completo debe tener al menos 3 caracteres.",
  }),

  corporateEmail: z
    .string()
    .nonempty("El correo es obligatorio")
    .email("Debe ser un correo válido con el dominio @empresa.com")
    .refine((val) => val.endsWith("@empresa.com"), {
      message: "El correo debe tener el dominio @empresa.com",
    }),

  sector: z.string().min(1, "El departamento es obligatorio"),

  admisionDate: z.string().refine(
    (val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateVal = new Date(val);
      return dateVal >= today;
    },
    { message: "La fecha de ingreso no puede ser anterior a hoy." }
  ),
  monthlySalary: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 800 && num <= 10000;
      },
      {
        message: "El salario debe ser un número entre 800 y 10000",
      }
    )
    .transform((val) => Number(val)),
  country: z.string().min(1, "El país es obligatorio"),
});

export type Employee = z.infer<typeof newEmployeeSchema>;
