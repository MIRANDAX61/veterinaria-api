import { prisma } from "../services/prisma";

export const MascotaModel = {
    async getAll() {
        return await prisma.mascota.findMany({
            orderBy: { id: "asc" },
            include: {
                receta: true,
                historial_visitas: true
            }
        });
    },

    async getById(id: number) {
        return await prisma.mascota.findUnique({
            where: { id },
            include: {
                receta: true,
                historial_visitas: true
            }
        });
    },

    async create(
        nombre: string,
        fecha_nacimiento: string | Date,
        sexo: "MACHO" | "HEMBRA",
        raza: string,
        obs_importantes: string
    ) {
        return await prisma.mascota.create({
            data: {
                nombre,
                fecha_nacimiento: new Date(fecha_nacimiento),
                sexo,
                raza,
                obs_importantes
            }
        });
    },

    async update(
        id: number,
        nombre?: string,
        fecha_nacimiento?: string | Date,
        sexo?: "MACHO" | "HEMBRA",
        raza?: string,
        obs_importantes?: string
    ) {
        return await prisma.mascota.update({
            where: { id },
            data: {
                ...(nombre !== undefined && { nombre }),
                ...(fecha_nacimiento !== undefined && {
                    fecha_nacimiento: new Date(fecha_nacimiento)
                }),
                ...(sexo !== undefined && { sexo }),
                ...(raza !== undefined && { raza }),
                ...(obs_importantes !== undefined && { obs_importantes })
            }
        });
    },

    async delete(id: number) {
        return await prisma.mascota.delete({
            where: { id }
        });
    }
};

