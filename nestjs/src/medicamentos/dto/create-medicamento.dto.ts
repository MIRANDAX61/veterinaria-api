import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMedicamentoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsDateString()
  fecha_vencimiento!: string;

  @IsString()
  @IsNotEmpty()
  marca!: string;

  @IsString()
  @IsNotEmpty()
  lote!: string;
}
