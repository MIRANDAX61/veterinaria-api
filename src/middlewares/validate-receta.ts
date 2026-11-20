import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const medicamentoRecetaSchema = z.object({
    medicamento_id: z.number().int().positive(),
    dosis: z.string().trim().min(1),
    frecuencia: z.string().trim().min(1),
    duracion: z.string().trim().min(1)
});

const recetaSchema = z.object({
    mascota_id: z.number().int().positive(),
    medicamentos: z.array(medicamentoRecetaSchema).min(1)
});

const updateRecetaSchema = z.object({
    mascota_id: z.number().int().positive().optional(),
    medicamentos: z.array(medicamentoRecetaSchema).optional()
}).refine(
    (datos) =>
        datos.mascota_id !== undefined ||
        datos.medicamentos !== undefined,
    {
        message: "Debes enviar al menos un campo para actualizar"
    }
);

export type CreateRecetaInput = z.infer<typeof recetaSchema>;
export type UpdateRecetaInput = z.infer<typeof updateRecetaSchema>;

export function validateCreateReceta(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = recetaSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: "Datos de la receta inválidos",
            detalles: result.error.issues
        });
        return;
    }

    req.body = result.data;
    next();
}

export function validateUpdateReceta(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = updateRecetaSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: "Datos para actualizar la receta inválidos",
            detalles: result.error.issues
        });
        return;
    }

    req.body = result.data;
    next();
}