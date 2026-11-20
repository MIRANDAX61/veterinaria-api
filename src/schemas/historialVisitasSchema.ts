import { z } from "zod";

// Schema para crear una visita (POST)
export const crearVisitaSchema = z.object({
  petId: z.string().uuid(),
  fecha: z.string().datetime(),
  motivo: z.string().min(3).max(500),
  sintomas: z.string().max(1000).optional(),
  diagnostico: z.string().max(1000).optional(),
  tratamiento: z.string().max(1000).optional(),
  costo: z.number().positive().optional(),
  veterinario: z.string().min(1).max(200),
  notas: z.string().max(2000).optional(),
  estado: z.enum(["pendiente", "completada", "cancelada"]).default("pendiente"),
});

export const visitaPorMascotaSchema = z.object({
  petId: z.string().uuid(),
});

export type NuevaVisita = z.infer<typeof crearVisitaSchema>;
export type VisitaPorMascota = z.infer<typeof visitaPorMascotaSchema>;   