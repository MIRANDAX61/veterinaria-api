import type { Request, Response } from "express";
import { MascotaModel } from "../Models/mascota.models";

export const getAllMascotas = async (req: Request, res: Response) => {
    try {
        const mascotas = await MascotaModel.getAll();
        res.status(200).json({ data: mascotas });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Error al obtener mascotas" });
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
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Error al crear mascota" });
    }
};
