import type { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { Prisma } from "../../generated/prisma/client";

type MedicamentoRecetaInput = {
  medicamento_id: number;
  dosis: string;
  frecuencia: string;
  duracion: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMedicamentoRecetaInput(
  value: unknown
): value is MedicamentoRecetaInput {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.medicamento_id === "number" &&
    Number.isInteger(value.medicamento_id) &&
    value.medicamento_id > 0 &&
    typeof value.dosis === "string" &&
    value.dosis.trim().length > 0 &&
    typeof value.frecuencia === "string" &&
    value.frecuencia.trim().length > 0 &&
    typeof value.duracion === "string" &&
    value.duracion.trim().length > 0
  );
}

function isMedicamentoRecetaInputArray(
  value: unknown
): value is MedicamentoRecetaInput[] {
  return Array.isArray(value) && value.every(isMedicamentoRecetaInput);
}
// GET: Obtener todas las recetas
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

    const receta = await prisma.receta.findUnique({
      where: { id },
      include: {
        mascota: true,
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
    });

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
  try {
    const body: unknown = req.body;

    if (!isRecord(body)) {
      res.status(400).json({ error: "Datos de la solicitud inválidos" });
      return;
    }

    const mascota_id = body.mascota_id;
    const medicamentos = body.medicamentos;
    if (
    typeof mascota_id !== "number" ||
    !Number.isInteger(mascota_id) ||
    mascota_id <= 0 ||
    !isMedicamentoRecetaInputArray(medicamentos) ||
    medicamentos.length === 0
  ) {
    res.status(400).json({
      error: "Debes proporcionar una mascota válida y al menos un medicamento válido",
    });
    return;
  }

    const newReceta = await prisma.receta.create({
      data: {
        mascota_id,
        medicamentos: {
          create: medicamentos.map((item) => ({
            medicamento_id: item.medicamento_id,
            dosis: item.dosis,
            frecuencia: item.frecuencia,
            duracion: item.duracion,
          })),
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


export async function updateReceta(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const body: unknown = req.body;

    if (!isRecord(body)) {
      res.status(400).json({ error: "Datos de la solicitud inválidos" });
      return;
    }

    const mascota_id = body.mascota_id;
    const medicamentos = body.medicamentos;

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "ID de receta inválido" });
      return;
    }

    // Verificar que se envíe al menos un dato para actualizar
    if (mascota_id === undefined && medicamentos === undefined) {
      res.status(400).json({
        error: "Debes enviar al menos un campo para actualizar",
      });
      return;
    }

    // Validar la lista de medicamentos, si fue enviada
    if (
      medicamentos !== undefined &&
      !isMedicamentoRecetaInputArray(medicamentos)
    ) {
      res.status(400).json({
        error: "Cada medicamento debe tener un ID válido, dosis, frecuencia y duración",
      });
      return;
    }

    if (
      mascota_id !== undefined &&
      (
        typeof mascota_id !== "number" ||
        !Number.isInteger(mascota_id) ||
        mascota_id <= 0
      )
    ) {
      res.status(400).json({
        error: "El ID de la mascota debe ser un número entero positivo",
      });
      return;
    }

    // Actualizar la receta y sus medicamentos en una transacción
    const recetaActualizada = await prisma.$transaction(async (tx) => {
      // Actualizar la mascota asociada, si fue enviada
      if (mascota_id !== undefined) {
        await tx.receta.update({
          where: { id },
          data: { mascota_id },
        });
      } else {
        // Comprobar que la receta exista
        await tx.receta.findUniqueOrThrow({
          where: { id },
        });
      }

      // Reemplazar los medicamentos solamente si fueron enviados
      if (medicamentos !== undefined) {
        await tx.receta_medicamento.deleteMany({
          where: { receta_id: id },
        });

        if (medicamentos.length > 0) {
          await tx.receta_medicamento.createMany({
            data: medicamentos.map((item) => ({
              receta_id: id,
              medicamento_id: item.medicamento_id,
              dosis: item.dosis,
              frecuencia: item.frecuencia,
              duracion: item.duracion,
            })),
          });
        }
      }

      // Obtener la receta actualizada con sus relaciones
      return await tx.receta.findUnique({
        where: { id },
        include: {
          mascota: true,
          medicamentos: {
            include: {
              medicamento: true,
            },
          },
        },
      });
    });

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

    await prisma.$transaction(async (tx) => {
      // Verificar que la receta exista
      await tx.receta.findUniqueOrThrow({
        where: { id },
      });

      // Eliminar las relaciones con medicamentos
      await tx.receta_medicamento.deleteMany({
        where: { receta_id: id },
      });

      // Eliminar la receta
      await tx.receta.delete({
        where: { id },
      });
    });

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



