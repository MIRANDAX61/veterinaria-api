import type { Request, Response } from "express";
import { RecetaModel } from "../models/receta.models";
import { Prisma } from "../../generated/prisma/client";
import type {
  CreateRecetaInput,
  UpdateRecetaInput,
} from "../middlewares/validate-receta";

// GET: Obtener todas las recetas
export async function getRecetas(req: Request, res: Response) {
  try {
    const recetas = await RecetaModel.getAll();

    res.status(200).json({ data: recetas });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener las recetas",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
// GET: Obtener una receta por ID
export async function getRecetaById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const receta = await RecetaModel.getById(id);

    if (!receta) {
      res.status(404).json({ error: "Receta no encontrada" });
      return;
    }

    res.status(200).json({ data: receta });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener la receta",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// POST: Crear una receta con varios medicamentos
export async function createReceta(req: Request, res: Response) {
  const { mascota_id, medicamentos } = req.body as CreateRecetaInput;

  try {
    const newReceta = await RecetaModel.create(
      mascota_id,
      medicamentos
    );

    res.status(201).json({
      status: "ok",
      data: newReceta,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      error: "Error al registrar la receta",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}


export async function updateReceta(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        error: "ID de receta inválido",
      });
      return;
    }

    const { mascota_id, medicamentos } = req.body as UpdateRecetaInput;

    const recetaActualizada = await RecetaModel.update(
      id,
      mascota_id,
      medicamentos
    );

    res.status(200).json({
      status: "ok",
      data: recetaActualizada,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({
          error: "Receta no encontrada",
        });
        return;
      }

      if (error.code === "P2003") {
        res.status(400).json({
          error: "La mascota o uno de los medicamentos no existe",
        });
        return;
      }

      if (error.code === "P2002") {
        res.status(409).json({
          error: "La receta contiene medicamentos duplicados",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Error al actualizar la receta",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}


export async function deleteReceta(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        error: "ID de receta inválido",
      });
      return;
    }

    await RecetaModel.delete(id);

    res.status(200).json({
      status: "ok",
      message: "Receta eliminada correctamente",
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({
          error: "Receta no encontrada",
        });
        return;
      }

      if (error.code === "P2003") {
        res.status(409).json({
          error: "No se puede eliminar la receta porque está relacionada con otros registros",
        });
        return;
      }
    }

    res.status(500).json({
      error: "Error al eliminar la receta",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}



