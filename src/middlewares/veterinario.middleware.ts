import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const veterinarioSchema = z.object({
    nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
    telefono: z.string().trim().min(10, "El número de teléfono debe contener al menos 10 caracteres"),
    correo: z.string().trim().min(10, "El correo debe tener al menos 10 caracteres")
});

export const veterinarioUpdateSchema = veterinarioSchema
    .partial()
    .refine(
        (datos) => Object.keys(datos).length > 0,
        {
            message: "Debes enviar al menos un campo para actualizar"
        }
    );

export function validateVeterinario(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = veterinarioSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: "Datos inválidos",
            details: result.error.issues
        });
        return;
    }

    req.body = result.data;
    next();
}

export function validateVeterinarioUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = veterinarioUpdateSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            error: "Datos para actualizar inválidos",
            details: result.error.issues
        });
        return;
    }

    req.body = result.data;
    next();
}