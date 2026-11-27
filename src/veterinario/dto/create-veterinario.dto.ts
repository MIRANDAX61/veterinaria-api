import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateVeterinarioDto {
  @ApiProperty({ example: 'Maria' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: '1245135561', minLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  telefono!: string;

  @ApiProperty({ example: 'examplefunval@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  correo!: string;

  @ApiProperty({ example: 'ClaveSegura123', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}