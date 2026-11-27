import { Type } from 'class-transformer';

import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RecetaMedicamentoDto {
  @IsInt()
  @IsPositive()
  medicamento_id!: number;

  @IsString()
  @IsNotEmpty()
  dosis!: string;

  @IsString()
  @IsNotEmpty()
  frecuencia!: string;

  @IsString()
  @IsNotEmpty()
  duracion!: string;
}

export class CreateRecetaDto {
  @IsInt()
  @IsPositive()
  mascota_id!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecetaMedicamentoDto)
  medicamentos!: RecetaMedicamentoDto[];
}
