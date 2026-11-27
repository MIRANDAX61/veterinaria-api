import { Controller, Get,Body, Post, Delete, Param, Patch, ParseIntPipe } from '@nestjs/common'
import { CreateVeterinarioDto } from './dto/create-veterinario.dto.js';
import { VeterinarioService } from './veterinario.service.js'
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto.js';

@Controller('veterinario')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @Post()
  create(@Body() CreateVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinarioService.create(CreateVeterinarioDto);
  }

  @Get()
  findAll()  {
    return this.veterinarioService.findAll()
  }
 @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinarioService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVeterinarioDto: UpdateVeterinarioDto,
  ) {
    return this.veterinarioService.update(id, updateVeterinarioDto);
  }

  
  @Delete('/hard/:id')
  hardRemove(@Param('id') id: string) {
    return this.veterinarioService.remove(+id);
  }
}
