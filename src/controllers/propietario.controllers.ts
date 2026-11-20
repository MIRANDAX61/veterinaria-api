import type { Request, Response } from "express";
import { PropietarioModel } from "../models/propietario.models";

export const getAllPropietarios = async (req: Request, res: Response) => {
    try {
        const propietarios = await PropietarioModel.getAll();
        res.status(200).json({ data: propietarios });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al obtener los propietarios",
            details: error.message
        });
    }
}

export const getPropietarioById = async (req: Request, res: Response) => {
    const idBuscado = Number(req.params.id);
    try {
        const propietario = await PropietarioModel.getById(idBuscado);
        if (!propietario) {
            return res
                .status(404)
                .json({ message: "el propietario con este id no existe" });
        }
        res.status(200).json({
            status: "ok",
            data: propietario
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al obtener el propietario",
            details: error.message
        });
    }
}

export const createPropietario = async (req: Request, res: Response) => {
    const { nombre, telefono, correo } = req.body;
    try {
        if (!nombre) {
            return res.status(400).json({
                message: "el nombre del propietario es obligatorio"
            });
        }

        if (correo) {
            const correoExistente = await PropietarioModel.getByCorreo(correo);
            if (correoExistente) {
                return res.status(400).json({
                    message: "el correo ya existe en otro propietario registrado"
                });
            }
        }

        const newPropietario = await PropietarioModel.create(nombre, telefono, correo);
        res.status(201).json({
            status: "ok",
            data: newPropietario
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al crear el propietario",
            details: error.message
        });
    }
}

export const putPropietario = async (req: Request, res: Response) => {
    const idBuscado = Number(req.params.id);
    const { nombre, telefono, correo } = req.body;
    try {
        const propietario = await PropietarioModel.getById(idBuscado);
        if (!propietario) {
            return res
                .status(404)
                .json({ message: "el propietario con este id no existe" });
        }

        if (correo && correo !== propietario.correo) {
            const correoExistente = await PropietarioModel.getByCorreo(correo);
            if (correoExistente) {
                return res.status(400).json({
                    message: "el correo ya existe en otro propietario registrado"
                });
            }
        }

        const updatePropietario = await PropietarioModel.update(
            idBuscado,
            nombre,
            telefono,
            correo
        );
        res.status(200).json({
            message: "propietario actualizado con exito",
            data: updatePropietario
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al actualizar el propietario",
            details: error.message
        });
    }
}

export const deletePropietario = async (req: Request, res: Response) => {
    const idBuscado = Number(req.params.id);
    try {
        const propietario = await PropietarioModel.getById(idBuscado);
        if (!propietario) {
            return res
                .status(404)
                .json({ message: "el propietario con este id no existe" });
        }

        const propietarioDelete = await PropietarioModel.delete(idBuscado);
        res.status(200).json({
            message: "propietario eliminado con exito",
            data: propietarioDelete
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "error al eliminar el propietario",
            details: error.message
        });
    }
}

