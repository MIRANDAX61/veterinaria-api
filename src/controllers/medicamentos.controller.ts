

import type { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function getMedicamentos(req: Request, res: Response) {
  try {
    const medicamentos = await prisma.medicamento.findMany({
      orderBy: { id: "asc" },
    });

    res.status(200).json({ data: medicamentos });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los medicamentos",
      details: error.message,
    });
  }
}


export async function createMedicamento(req: Request, res: Response) {
  const { nombre, fecha_vencimiento, marca, lote } = req.body;

  try {
    const newMedicamento = await prisma.medicamento.create({
      data: {
        nombre,
        fecha_vencimiento: new Date(fecha_vencimiento),
        marca,
        lote,
      },
    });

    res.status(201).json({
      status: "ok",
      data: newMedicamento,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al registrar el medicamento",
      details: error.message,
    });
  }
}


