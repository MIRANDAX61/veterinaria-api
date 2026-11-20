import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../Prisma";


export async function register(req: Request, res: Response) {
  try {
    const { nombre, telefono, correo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.veterinario.create({
      data: { correo, password: hashedPassword, nombre, telefono },
      select: { id: true, correo: true, rol: true },
    });

    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el usuario",
      details: error.message,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { correo, password } = req.body;
    const veterinario = await prisma.veterinario.findUnique({ where: { correo } });

    if (!veterinario || !(await bcrypt.compare(password, veterinario.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: veterinario.id, correo: veterinario.correo, rol: veterinario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al eliminar el usuario",
      details: error.message,
    });
  }
}