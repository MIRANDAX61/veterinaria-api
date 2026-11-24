export class RecetaMedicamentoDto {
  medicamento_id: number;
  dosis: string;
  frecuencia: string;
  duracion: string;
}

export class CreateRecetaDto {
  mascota_id: number;
  medicamentos: RecetaMedicamentoDto[];
}