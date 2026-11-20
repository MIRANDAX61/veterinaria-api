import { prisma } from "../services/prisma";

export const PropietarioModel = {
    async getAll() {
        return await prisma.propietario.findMany({
            orderBy: { id: "asc" }
        });
    },

    async getById(id: number) {
        return await prisma.propietario.findUnique({
            where: { id }
        });
    },

    async getByCorreo(correo: string) {
        return await prisma.propietario.findUnique({
            where: { correo }
        });
    },

    async create(nombre: string, telefono?: string, correo?: string) {
        return await prisma.propietario.create({
            data: {
                nombre,
                telefono: telefono ?? null,
                correo: correo ?? null
            }
        });
    },

    async update(
        id: number,
        nombre?: string,
        telefono?: string | null,
        correo?: string | null
    ) {
        return await prisma.propietario.update({
            where: { id },
            data: {
                ...(nombre !== undefined && { nombre }),
                ...(telefono !== undefined && { telefono }),
                ...(correo !== undefined && { correo })
            }
        });
    },

    async delete(id: number) {
        return await prisma.propietario.delete({
            where: { id }
        });
    }
};

