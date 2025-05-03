// src/dtos/estudiante.dto.ts
import { IsNotEmpty, IsString, Length, Matches, IsDateString } from 'class-validator';

export default class EstudianteDTO {
  @IsNotEmpty({ message: 'El código RUDE es obligatorio' })
  @Length(1, 15, { message: 'El código RUDE debe tener máximo 15 caracteres' })
  codigo_rude!: string;

  @IsNotEmpty({ message: 'La cédula de identidad es obligatoria' })
  @Length(1, 10, { message: 'La cédula de identidad debe tener máximo 10 caracteres' })
  cedula_identidad!: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(1, 100, { message: 'El nombre debe tener máximo 100 caracteres' })
  nombre!: string;

  @IsNotEmpty({ message: 'El apellido paterno es obligatorio' })
  @IsString({ message: 'El apellido paterno debe ser texto' })
  @Length(1, 100, { message: 'El apellido paterno debe tener máximo 100 caracteres' })
  apellido_paterno!: string;

  @IsNotEmpty({ message: 'El apellido materno es obligatorio' })
  @IsString({ message: 'El apellido materno debe ser texto' })
  @Length(1, 100, { message: 'El apellido materno debe tener máximo 100 caracteres' })
  apellido_materno!: string;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @Matches(/^[MF]$/, { message: 'El género debe ser "M" o "F"' })
  genero!: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD' })
  fecha_nacimiento!: string;
}