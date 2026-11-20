import type { Request, Response, NextFunction } from "express";
import { prisma } from "../services/prisma";

class HistorialVisitasController {
  async crear(req: Request, res: Response, next: NextFunction) {
    try {
      const visita = await prisma.historial_visitas.create({
        data: {
          mascota_id: req.body.mascota_id,
          veterinario_id: req.body.veterinario_id,
          receta_id: req.body.receta_id || null,
          fecha: new Date(req.body.fecha),
          motivo: req.body.motivo,
          diagnostico: req.body.diagnostico,
          tratamiento: req.body.tratamiento,
        },
        include: { mascota: true, veterinario: true, receta: true },
      });
      res.status(201).json({ success: true, data: visita });
    } catch (err) {
      next(err);
    }
  }

  async obtenerTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const visitas = await prisma.historial_visitas.findMany({
        include: { mascota: true, veterinario: true, receta: true },
        orderBy: { fecha: 'desc' },
      });
      res.json({ success: true, data: visitas });
    } catch (err) {
      next(err);
    }
  }

  async obtenerPorMascota(req: Request, res: Response, next: NextFunction) {
    try {
      const visita = await prisma.historial_visitas.findUnique({
        where: { mascota_id: Number(req.params.mascotaId) },
        include: { veterinario: true, receta: true },
      });
      if (!visita) {
        return res.status(404).json({ success: false, message: 'Sin visitas registradas' });
      }
      res.json({ success: true, data: visita });
    } catch (err) {
      next(err);
    }
  }
}

export default new HistorialVisitasController();   