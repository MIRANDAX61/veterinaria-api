import { prisma } from "../services/prisma";
import type { Veterinario, Prisma } from "../../generated/prisma/client";


export const getVeterinarios = async (): Promise<Veterinario[]> => {

    return await prisma.veterinario.findMany({
      orderBy: { id: "asc" },
    });
     };

export const VeterinarioId = async (id: number) => {
  return prisma.veterinario.findUnique({
    where: { id },
  });
};

export const createVeterinarios = async (data: Prisma.VeterinarioCreateInput): Promise<Veterinario> =>  {
    return await prisma.veterinario.create ({
        data,
    });

};   


export const updateVeterinario = async (
     id: number,
  data: {
    nombre?: string
    telefono?: string
    correo?: string
  }
) => {
  return await prisma.veterinario.update({
    where: { id },
    data,
  })
}

export const deleteVeterinario = async (id: number)=> {
  return prisma.veterinario.delete({
    where: {
      id: id,
    },
  });
};
