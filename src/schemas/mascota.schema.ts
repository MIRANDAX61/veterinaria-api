import { z } from "zod";

export const createMascotaSchema = z.strictObject({
  nombre: z
    .string({ message: "el nombre es un string y es obligatorio" })
    .trim()
    .min(2, "el nombre debe tener almenos 2 caracteres")
    .max(80, "el nombre puede tener cm maximo 80 caracteres"),
  fecha_nacimiento: z
    .string({
      message: "la fecha de nacimiento es un string (YYYY-MM-DD) y es obligatoria",
    })
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "la fecha de nacimiento debe tener el formato YYYY-MM-DD"
    ),
  sexo: z.enum(["MACHO", "HEMBRA"], {
    message: "el sexo debe ser MACHO o HEMBRA y es obligatorio",
  }),
  raza: z
    .string({ message: "la raza es un string y es obligatoria" })
    .trim()
    .min(2, "la raza debe tener almenos 2 caracteres")
    .max(60, "la raza puede tener cm maximo 60 caracteres"),
  obs_importantes: z
    .string({
      message: "las observaciones importantes deben ser un string y son obligatorias",
    })
    .trim()
    .min(2, "las observaciones importantes deben tener almenos 2 caracteres")
    .max(255, "las observaciones importantes pueden tener cm maximo 255 caracteres"),
});

export const updateMascotaSchema = createMascotaSchema.partial();
