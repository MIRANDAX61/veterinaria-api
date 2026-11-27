import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinarioDto } from './create-veterinario.dto.js';

export class UpdateVeterinarioDto extends PartialType(CreateVeterinarioDto) {}
