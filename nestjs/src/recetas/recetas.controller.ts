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

import { RecetasService } from './recetas.service.js';
import { CreateRecetaDto } from './dto/create-receta.dto.js';
import { UpdateRecetaDto } from './dto/update-receta.dto.js';

@Controller('recetas')
export class RecetasController {
  constructor(
    private readonly recetasService: RecetasService,
  ) {}

  @Post()
  create(@Body() data: CreateRecetaDto) {
    return this.recetasService.create(data);
  }

  @Get()
  findAll() {
    return this.recetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recetasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRecetaDto,
  ) {
    return this.recetasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recetasService.remove(id);
  }
}