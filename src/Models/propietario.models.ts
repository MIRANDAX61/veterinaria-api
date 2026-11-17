import { prisma } from "../config/prisma";

export const PropietarioModel = {
    async getAll() {
        return await prisma.propietario.findMany({
            orderBy: [
                { id: "asc" }
            ]
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
    }
};
