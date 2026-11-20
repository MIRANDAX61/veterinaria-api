import type { Request, Response } from "express";
import { MascotaModel } from "../models/mascota.models";

export async function getAllMascotas(req: Request, res: Response) {
    try {
        const mascotas = await MascotaModel.getAll();
        res.status(200).json({ data: mascotas });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al obtener las mascotas",
            details: error.message
        });
    }
}

export async function getMascotaById(req: Request, res: Response) {
    const idBuscado = Number(req.params.id);
    try {
        const mascota = await MascotaModel.getById(idBuscado);
        if (!mascota) {
            return res
                .status(404)
                .json({ message: "la mascota con este id no existe" });
        }
        res.status(200).json({
            status: "ok",
            data: mascota
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al obtener la mascota",
            details: error.message
        });
    }
}

export async function createMascota(req: Request, res: Response) {
    const { nombre, fecha_nacimiento, sexo, raza, obs_importantes } = req.body;
    try {
        if (!nombre || !fecha_nacimiento || !sexo || !raza || !obs_importantes) {
            return res.status(400).json({
                message: "todos los campos de la mascota son obligatorios"
            });
        }

        if (sexo !== "MACHO" && sexo !== "HEMBRA") {
            return res.status(400).json({
                message: "el sexo de la mascota debe ser MACHO o HEMBRA"
            });
        }

        const newMascota = await MascotaModel.create(
            nombre,
            fecha_nacimiento,
            sexo,
            raza,
            obs_importantes
        );
        res.status(201).json({
            status: "ok",
            data: newMascota
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al crear la mascota",
            details: error.message
        });
    }
}

export async function putMascota(req: Request, res: Response) {
    const idBuscado = Number(req.params.id);
    const { nombre, fecha_nacimiento, sexo, raza, obs_importantes } = req.body;
    try {
        const mascota = await MascotaModel.getById(idBuscado);
        if (!mascota) {
            return res
                .status(404)
                .json({ message: "la mascota con este id no existe" });
        }

        if (sexo !== undefined && sexo !== "MACHO" && sexo !== "HEMBRA") {
            return res.status(400).json({
                message: "el sexo de la mascota debe ser MACHO o HEMBRA"
            });
        }

        const updateMascota = await MascotaModel.update(
            idBuscado,
            nombre,
            fecha_nacimiento,
            sexo,
            raza,
            obs_importantes
        );
        res.status(200).json({
            message: "mascota actualizada con exito",
            data: updateMascota
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al actualizar la mascota",
            details: error.message
        });
    }
}

export async function deleteMascota(req: Request, res: Response) {
    const idBuscado = Number(req.params.id);
    try {
        const mascota = await MascotaModel.getById(idBuscado);
        if (!mascota) {
            return res
                .status(404)
                .json({ message: "la mascota con este id no existe" });
        }

        if (mascota.receta.length > 0 || mascota.historial_visitas) {
            return res.status(400).json({
                message:
                    "no podemos eliminar una mascota q tiene recetas o historial de visitas, elimina primero sus registros relacionados"
            });
        }

        const mascotaDelete = await MascotaModel.delete(idBuscado);
        res.status(200).json({
            message: "mascota eliminada con exito",
            data: mascotaDelete
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al eliminar la mascota",
            details: error.message
        });
    }
}

