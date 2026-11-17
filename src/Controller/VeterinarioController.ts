import type {Request,Response} from "express"; 

import { prisma } from "../Prisma";

export async function getVeterinarios(req: Request, res: Response) {
  try {
    const Veterinarios = await prisma.veterinario.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json({ data: Veterinarios });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los veterianrios",
      details: error.mesagge,
    });
  }
}

export async function createVeterinario(req: Request, res: Response) {
  const { nombre, correo, telefono} = req.body;
  try {
    const newVeterinario = await prisma.veterinario.create({
      data: {
        nombre,
        correo,
        telefono
      },
    });
    res.status(201).json({
      status: "ok",
      data: newVeterinario,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los veterinarios",
      details: error.mesagge,
    });
  }
}