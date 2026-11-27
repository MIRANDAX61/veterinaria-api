import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional,IsEnum} from 'class-validator';
import { Role } from '../../../generated/prisma/enums.js';

export class RegisterDto {
    @ApiProperty({ example: 'examplefunval@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({ enum: Role, example: Role.VETERINARIO })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}