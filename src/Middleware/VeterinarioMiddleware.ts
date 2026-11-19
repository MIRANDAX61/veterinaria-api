import { z } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const veterinarioSchema = z.object({
  nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  telefono: z.string().trim().min(10, 'el numero de telefono debe contener al menos 10 caracteres'),
  correo: z.string().trim().min(10,' el correo debe tener al menos 10 caracteres')
})


export const validateVeterinario = (req: Request, res: Response, next: NextFunction) => {
  const result = veterinarioSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: result.error.issues,
    });
  }

  req.body = result.data;
  next();
};
