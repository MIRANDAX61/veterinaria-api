import { type Request, type Response } from "express";
import { PropietarioModel } from "../Models/propietario.models";

export const getAllPropietarios = async (req: Request, res: Response) => {
    try {
        const propietarios = await PropietarioModel.getAll();
        res.status(200).json({ data: propietarios });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Error al obtener propietarios" });
    }
};

export const createPropietario = async (req: Request, res: Response) => {
    try {
        const { nombre, telefono, correo } = req.body;
        const propietario = await PropietarioModel.create(nombre, telefono, correo);
        res.status(201).json({ data: propietario });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Error al crear propietario" });
    }
};
