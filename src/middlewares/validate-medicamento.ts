import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

// Validación de fecha en formato YYYY-MM-DD
const fechaVencimientoSchema = z.string().refine((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(5, 7));
    const day = Number(value.slice(8, 10));

    const fecha = new Date(Date.UTC(year, month - 1, day));

    return (
    fecha.getUTCFullYear() === year &&
    fecha.getUTCMonth() === month - 1 &&
    fecha.getUTCDate() === day
    );
}, "La fecha debe ser válida y tener el formato YYYY-MM-DD");

// Esquema para registrar un medicamento
const createMedicamentoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  fecha_vencimiento: fechaVencimientoSchema,
  marca: z.string().trim().min(1, "La marca es obligatoria"),
  lote: z.string().trim().min(1, "El lote es obligatorio"),
});

// Esquema para actualizar un medicamento
const updateMedicamentoSchema = createMedicamentoSchema
  .partial()
  .refine(
    (datos) => Object.keys(datos).length > 0,
    {
      message: "Debes enviar al menos un campo para actualizar",
    }
  );

export type CreateMedicamentoInput = z.infer<
  typeof createMedicamentoSchema
>;

export type UpdateMedicamentoInput = z.infer<
  typeof updateMedicamentoSchema
>;

// Middleware para registrar
export function validateCreateMedicamento(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = createMedicamentoSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Datos del medicamento inválidos",
      details: result.error.issues,
    });
    return;
  }

  req.body = result.data;
  next();
}

// Middleware para actualizar
export function validateUpdateMedicamento(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = updateMedicamentoSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Datos para actualizar el medicamento inválidos",
      details: result.error.issues,
    });
    return;
  }

  req.body = result.data;
  next();
}