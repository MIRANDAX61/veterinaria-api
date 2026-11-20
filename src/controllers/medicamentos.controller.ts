
import type { Request, Response } from "express";
import { MedicamentoModel } from "../models/medicamento.models";
import { Prisma } from "../../generated/prisma/client";

// GET: Obtener todos los medicamentos
export async function getMedicamentos(req: Request, res: Response) {
  try {
    const medicamentos = await MedicamentoModel.getAll();

    res.status(200).json({ data: medicamentos });
  } catch (error: unknown) {
  console.error(error);
    res.status(500).json({
      error: "Error al obtener los medicamentos",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// GET: Obtener un medicamento por ID
export async function getMedicamentoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const medicamento = await MedicamentoModel.getById(id);

    if (!medicamento) {
      res.status(404).json({ error: "Medicamento no encontrado" });
      return;
    }

    res.status(200).json({ data: medicamento });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      error: "Error al realizar la operación",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// POST: Registrar un medicamento
export async function createMedicamento(req: Request, res: Response) {
  const { nombre, fecha_vencimiento, marca, lote } = req.body;

  try {
    if (!nombre || !fecha_vencimiento || !marca || !lote) {
      res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
      return;
    }

    const fecha = new Date(fecha_vencimiento);

    if (isNaN(fecha.getTime())) {
      res.status(400).json({ error: "Fecha de vencimiento inválida" });
      return;
    }

    const newMedicamento = await MedicamentoModel.create(
    nombre,
    fecha,
    marca,
    lote
  );

    res.status(201).json({
      status: "ok",
      data: newMedicamento,
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      error: "Error al realizar la operación",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// PUT: Actualizar un medicamento
export async function updateMedicamento(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const { nombre, fecha_vencimiento, marca, lote } = req.body;

    if (
      nombre === undefined &&
      fecha_vencimiento === undefined &&
      marca === undefined &&
      lote === undefined
    ) {
      res.status(400).json({
        error: "Debes enviar al menos un campo para actualizar",
      });
      return;
    }

    if (fecha_vencimiento !== undefined) {
      const fecha = new Date(fecha_vencimiento);

      if (isNaN(fecha.getTime())) {
        res.status(400).json({ error: "Fecha de vencimiento inválida" });
        return;
      }
    }

    const medicamento = await MedicamentoModel.update(
      id,
      nombre,
      fecha_vencimiento,
      marca,
      lote
    );

    res.status(200).json({
      status: "ok",
      data: medicamento,
    });
} catch (error: unknown) {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      res.status(404).json({
        error: "Medicamento no encontrado",
      });
      return;
    }
  }

  res.status(500).json({
    error: "Error al actualizar el medicamento",
    details: error instanceof Error ? error.message : "Error desconocido",
  });
}
}

// DELETE: Eliminar un medicamento
export async function deleteMedicamento(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    await MedicamentoModel.delete(id);

    res.status(200).json({
      status: "ok",
      message: "Medicamento eliminado correctamente",
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({
          error: "Medicamento no encontrado",
        });
        return;
      }

      if (error.code === "P2003") {
        res.status(409).json({
          error: "No se puede eliminar el medicamento porque está relacionado con una receta",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Error al eliminar el medicamento",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
