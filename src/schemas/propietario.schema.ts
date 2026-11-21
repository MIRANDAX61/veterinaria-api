import { z } from "zod";

export const createPropietarioSchema = z.strictObject({
  nombre: z
    .string({ message: "el nombre es un string y es obligatorio" })
    .trim()
    .min(2, "el nombre debe tener almenos 2 caracteres")
    .max(80, "el nombre puede tener cm maximo 80 caracteres"),
  telefono: z
    .string({ message: "el telefono debe ser un string" })
    .trim()
    .min(7, "el telefono debe tener almenos 7 caracteres")
    .max(20, "el telefono puede tener cm maximo 20 caracteres")
    .optional(),
  correo: z
    .string({ message: "el correo debe ser un string" })
    .trim()
    .email("el correo debe tener un formato valido")
    .max(80, "el correo puede tener cm maximo 80 caracteres")
    .optional(),
});

export const updatePropietarioSchema = createPropietarioSchema.partial();
