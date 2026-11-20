import { prisma } from "../services/prisma";

export const MedicamentoModel = {
    async getAll() {
        return await prisma.medicamento.findMany({
            orderBy: [
                { id: "asc" }
            ]
        });
    },

    async getById(id: number) {
        return await prisma.medicamento.findUnique({
            where: { id }
        });
    },

    async create(
        nombre: string,
        fecha_vencimiento: string | Date,
        marca: string,
        lote: string
    ) {
        return await prisma.medicamento.create({
            data: {
                nombre,
                fecha_vencimiento: new Date(fecha_vencimiento),
                marca,
                lote
            }
        });
    },

    async update(
        id: number,
        nombre?: string,
        fecha_vencimiento?: string | Date,
        marca?: string,
        lote?: string
    ) {
        return await prisma.medicamento.update({
            where: { id },
            data: {
                ...(nombre !== undefined && { nombre }),
                ...(fecha_vencimiento !== undefined && {
                    fecha_vencimiento: new Date(fecha_vencimiento)
                }),
                ...(marca !== undefined && { marca }),
                ...(lote !== undefined && { lote })
            }
        });
    },

    async delete(id: number) {
        return await prisma.medicamento.delete({
            where: { id }
        });
    }
};