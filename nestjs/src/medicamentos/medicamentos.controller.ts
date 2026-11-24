import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { MedicamentosService } from './medicamentos.service.js';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto.js';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto.js';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(
    private readonly medicamentosService: MedicamentosService,
  ) {}

  @Post()
  create(@Body() data: CreateMedicamentoDto) {
    return this.medicamentosService.create(data);
  }

  @Get()
  findAll() {
    return this.medicamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicamentosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMedicamentoDto,
  ) {
    return this.medicamentosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicamentosService.remove(id);
  }
}