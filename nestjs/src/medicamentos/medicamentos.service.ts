import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto.js';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto.js';

@Injectable()
export class MedicamentosService {
  constructor(private readonly prisma: PrismaService) {}

  // Convierte y valida la fecha de vencimiento
  private validarFecha(fecha: string): Date {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      throw new BadRequestException(
        'La fecha debe tener el formato YYYY-MM-DD',
      );
    }

    const fechaDate = new Date(`${fecha}T00:00:00.000Z`);

    if (
      Number.isNaN(fechaDate.getTime()) ||
      fechaDate.toISOString().slice(0, 10) !== fecha
    ) {
      throw new BadRequestException('La fecha de vencimiento no es válida');
    }

    return fechaDate;
  }

  // Crear medicamento
  create(data: CreateMedicamentoDto) {
    return this.prisma.medicamento.create({
      data: {
        ...data,
        fecha_vencimiento: this.validarFecha(data.fecha_vencimiento),
      },
    });
  }

  // Obtener todos los medicamentos
  findAll() {
    return this.prisma.medicamento.findMany({
      orderBy: { id: 'asc' },
    });
  }

  // Obtener un medicamento por ID
  async findOne(id: number) {
    const medicamento = await this.prisma.medicamento.findUnique({
      where: { id },
    });

    if (!medicamento) {
      throw new NotFoundException(
        `No se encontró el medicamento con ID ${id}`,
      );
    }

    return medicamento;
  }

  // Actualizar medicamento
  async update(id: number, data: UpdateMedicamentoDto) {
    await this.findOne(id);

    const { fecha_vencimiento, ...otrosDatos } = data;

    return this.prisma.medicamento.update({
      where: { id },
      data: {
        ...otrosDatos,
        ...(fecha_vencimiento !== undefined && {
          fecha_vencimiento: this.validarFecha(fecha_vencimiento),
        }),
      },
    });
  }

  // Eliminar medicamento
  async remove(id: number) {
    await this.findOne(id);

    const medicamentoEnReceta =
      await this.prisma.receta_medicamento.count({
        where: { medicamento_id: id },
      });

    if (medicamentoEnReceta > 0) {
      throw new ConflictException(
        'No se puede eliminar el medicamento porque está relacionado con una receta',
      );
    }

    return this.prisma.medicamento.delete({
      where: { id },
    });
  }
}