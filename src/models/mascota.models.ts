import { prisma } from "../services/prisma";
export const MascotaModel = {
    async getAll() {
        return await prisma.mascota.findMany({
            orderBy: [
                { id: "asc" }
            ]
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
    }
};
