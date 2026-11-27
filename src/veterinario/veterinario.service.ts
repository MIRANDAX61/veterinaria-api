import {  Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto.js';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto.js';
import { Update } from 'vite';
import bcrypt from 'bcryptjs';

@Injectable()
export class VeterinarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateVeterinarioDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return this.prisma.veterinario.create({
      data: {
        nombre: data.nombre,
        telefono: data.telefono,
        correo: data.correo,
        user: {
          create: {
            email: data.correo,
            name: data.nombre,
            password: passwordHash,
            role: 'VETERINARIO', 
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }


  findAll() {
    return this.prisma.veterinario.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.veterinario.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateVeterinarioDto) {
    return this.prisma.veterinario.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.veterinario.delete({
      where: { id },
    });
  }
}