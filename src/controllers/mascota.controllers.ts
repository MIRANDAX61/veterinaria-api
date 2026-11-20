import type { Request, Response } from "express";
import { MascotaModel } from "../models/mascota.models";

export const getAllMascotas = async (req: Request, res: Response) => {
    try {
        const mascotas = await MascotaModel.getAll();
        res.status(200).json({ data: mascotas });
    } catch (error: unknown) {
    res.status(500).json({
        error: "Error al obtener mascotas",
        details: error instanceof Error ? error.message : "Error desconocido",
    });
}
};

export const createMascota = async (req: Request, res: Response) => {
    try {
        const { nombre, fecha_nacimiento, sexo, raza, obs_importantes } = req.body;
        const mascota = await MascotaModel.create(
            nombre,
            fecha_nacimiento,
            sexo,
            raza,
            obs_importantes
        );
        res.status(201).json({ data: mascota });
    } catch (error: unknown) {
    res.status(500).json({
        error: "Error al crear mascota",
        details: error instanceof Error ? error.message : "Error desconocido",
    });
}
};
