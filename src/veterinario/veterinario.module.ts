import { Module } from '@nestjs/common';
import { VeterinarioController } from './veterinario.controller.js';
import { VeterinarioService } from './veterinario.service.js';

@Module({
  controllers: [VeterinarioController],
  providers: [VeterinarioService]
})
export class VeterinarioModule {}
