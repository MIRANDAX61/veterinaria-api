import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';

@Injectable()
export class RecetasService {
  constructor(private readonly prisma: PrismaService) {}

  // Validar que la mascota exista
  private async validarMascota(id: number) {
    const mascota = await this.prisma.mascota.findUnique({
      where: { id },
    });

    if (!mascota) {
      throw new NotFoundException(
        `No se encontró la mascota con ID ${id}`,
      );
    }
  }

  // Validar los medicamentos asociados
  private async validarMedicamentos(medicamentos: CreateRecetaDto['medicamentos']) {
    const ids = medicamentos.map((item) => item.medicamento_id);
    const idsUnicos = new Set(ids);

    if (idsUnicos.size !== ids.length) {
      throw new BadRequestException(
        'No puedes agregar el mismo medicamento dos veces a una receta',
      );
    }

    if (ids.length === 0) {
      throw new BadRequestException(
        'La receta debe contener al menos un medicamento',
      );
    }

    const encontrados = await this.prisma.medicamento.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (encontrados.length !== ids.length) {
      throw new NotFoundException(
        'Uno o varios medicamentos no existen',
      );
    }
  }

  // Crear receta con medicamentos
  async create(data: CreateRecetaDto) {
    await this.validarMascota(data.mascota_id);
    await this.validarMedicamentos(data.medicamentos);

    return this.prisma.receta.create({
      data: {
        mascota_id: data.mascota_id,
        medicamentos: {
          create: data.medicamentos.map((item) => ({
            dosis: item.dosis,
            frecuencia: item.frecuencia,
            duracion: item.duracion,
            medicamento: {
              connect: { id: item.medicamento_id },
            },
          })),
        },
      },
      include: {
        mascota: true,
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
    });
  }

  // Listar recetas
  findAll() {
    return this.prisma.receta.findMany({
      include: {
        mascota: true,
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  // Consultar receta por ID
  async findOne(id: number) {
    const receta = await this.prisma.receta.findUnique({
      where: { id },
      include: {
        mascota: true,
        medicamentos: {
          include: {
            medicamento: true,
          },
        },
      },
    });

    if (!receta) {
      throw new NotFoundException(
        `No se encontró la receta con ID ${id}`,
      );
    }

    return receta;
  }

  // Actualizar receta
  async update(id: number, data: UpdateRecetaDto) {
    await this.findOne(id);

    if (data.mascota_id !== undefined) {
      await this.validarMascota(data.mascota_id);
    }

    if (data.medicamentos !== undefined) {
      await this.validarMedicamentos(data.medicamentos);
    }

    return this.prisma.$transaction(async (tx) => {
      if (data.mascota_id !== undefined) {
        await tx.receta.update({
          where: { id },
          data: {
            mascota: {
              connect: { id: data.mascota_id },
            },
          },
        });
      }

      if (data.medicamentos !== undefined) {
        await tx.receta_medicamento.deleteMany({
          where: { receta_id: id },
        });

        await tx.receta_medicamento.createMany({
          data: data.medicamentos.map((item) => ({
            receta_id: id,
            medicamento_id: item.medicamento_id,
            dosis: item.dosis,
            frecuencia: item.frecuencia,
            duracion: item.duracion,
          })),
        });
      }

      return tx.receta.findUnique({
        where: { id },
        include: {
          mascota: true,
          medicamentos: {
            include: {
              medicamento: true,
            },
          },
        },
      });
    });
  }

  // Eliminar receta
  async remove(id: number) {
        await this.findOne(id);

        const historial = await this.prisma.historial_visitas.count({
            where: { receta_id: id },
        });

        if (historial > 0) {
            throw new ConflictException(
            'No se puede eliminar la receta porque está relacionada con un historial de visitas',
            );
        }

        return this.prisma.$transaction(async (tx) => {
            await tx.receta_medicamento.deleteMany({
            where: { receta_id: id },
            });

            return tx.receta.delete({
            where: { id },
            });
        });
    }
}