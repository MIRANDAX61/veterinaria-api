
import type { Request, Response } from "express";
import { prisma } from "../services/prisma";


export async function getRecetas(req: Request, res: Response) {
  try {
    const recetas = await prisma.receta.findMany({
      orderBy: { id: "asc" },
      include: {
        mascota: true,
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
    });

    res.status(200).json({ data: recetas });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener las recetas",
      details: error.message,
    });
  }
}



export async function createReceta(req: Request, res: Response) {
  const {
    mascota_id,
    medicamento_id,
    dosis,
    frecuencia,
    duracion,
  } = req.body;

  try {
    const newReceta = await prisma.receta.create({
      data: {
        mascota_id,
        medicamentos: {
          create: {
            medicamento_id,
            dosis,
            frecuencia,
            duracion,
          },
        },
      },
      include: {
        mascota: true,
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
    });

    res.status(201).json({
      status: "ok",
      data: newReceta,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al registrar la receta",
      details: error.message,
    });
  }
}

