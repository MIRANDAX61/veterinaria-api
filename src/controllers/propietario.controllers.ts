import { type Request, type Response } from "express";
import { PropietarioModel } from "../models/propietario.models";

export const getAllPropietarios = async (req: Request, res: Response) => {
    try {
        const propietarios = await PropietarioModel.getAll();
        res.status(200).json({ data: propietarios });
    } catch (error: unknown) {
        res.status(500).json({
            error: "Error al obtener propietarios",
            details: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

export const createPropietario = async (req: Request, res: Response) => {
    try {
        const { nombre, telefono, correo } = req.body;
        const propietario = await PropietarioModel.create(nombre, telefono, correo);
        res.status(201).json({ data: propietario });
    } catch (error: unknown) {
        res.status(500).json({
            error: "Error al crear propietario",
            details: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
