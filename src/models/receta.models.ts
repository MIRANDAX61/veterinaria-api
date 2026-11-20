import { prisma } from "../services/prisma";

type MedicamentoRecetaInput = {
    medicamento_id: number;
    dosis: string;
    frecuencia: string;
    duracion: string;
};

export const RecetaModel = {
    async getAll() {
        return await prisma.receta.findMany({
            orderBy: [
                { id: "asc" }
            ],
            include: {
                mascota: true,
                medicamentos: {
                    include: {
                        medicamento: true
                    }
                }
            }
        });
    },

    async getById(id: number) {
        return await prisma.receta.findUnique({
            where: { id },
            include: {
                mascota: true,
                medicamentos: {
                    include: {
                        medicamento: true
                    }
                }
            }
        });
    },

    async create(
        mascota_id: number,
        medicamentos: MedicamentoRecetaInput[]
    ) {
        return await prisma.receta.create({
            data: {
                mascota_id,
                medicamentos: {
                    create: medicamentos.map((item) => ({
                        medicamento_id: item.medicamento_id,
                        dosis: item.dosis,
                        frecuencia: item.frecuencia,
                        duracion: item.duracion
                    }))
                }
            },
            include: {
                mascota: true,
                medicamentos: {
                    include: {
                        medicamento: true
                    }
                }
            }
        });
    },

    async update(
        id: number,
        mascota_id?: number,
        medicamentos?: MedicamentoRecetaInput[]
    ) {
        return await prisma.$transaction(async (tx) => {
            if (mascota_id !== undefined) {
                await tx.receta.update({
                    where: { id },
                    data: { mascota_id }
                });
            } else {
                await tx.receta.findUniqueOrThrow({
                    where: { id }
                });
            }

            if (medicamentos !== undefined) {
                await tx.receta_medicamento.deleteMany({
                    where: { receta_id: id }
                });

                if (medicamentos.length > 0) {
                    await tx.receta_medicamento.createMany({
                        data: medicamentos.map((item) => ({
                            receta_id: id,
                            medicamento_id: item.medicamento_id,
                            dosis: item.dosis,
                            frecuencia: item.frecuencia,
                            duracion: item.duracion
                        }))
                    });
                }
            }

            return await tx.receta.findUnique({
                where: { id },
                include: {
                    mascota: true,
                    medicamentos: {
                        include: {
                            medicamento: true
                        }
                    }
                }
            });
        });
    },

    async delete(id: number) {
        return await prisma.$transaction(async (tx) => {
            await tx.receta.findUniqueOrThrow({
                where: { id }
            });

            await tx.receta_medicamento.deleteMany({
                where: { receta_id: id }
            });

            return await tx.receta.delete({
                where: { id }
            });
        });
    }
};