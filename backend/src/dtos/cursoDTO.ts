import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CursoDTO {
    
    @IsNotEmpty({ message: 'El grado es obligatorio' })
    @IsString({ message: 'El grado debe ser texto' })
    @Length(1, 20, { message: 'El grado debe tener entre 1 y 20 caracteres' })
    grado!: string;

    @IsNotEmpty({ message: 'El grupo es obligatorio' })
    @IsString({ message: 'El grupo debe ser texto' })
    @Length(1, 1, { message: 'El grupo debe tener exactamente 1 caracter' })
    grupo!: string;

    @IsNotEmpty({ message: 'El nivel es obligatorio' })
    @IsString({ message: 'El nivel debe ser texto' })
    @Length(1, 20, { message: 'El nivel debe tener entre 1 y 20 caracteres' })
    nivel!: string;
}
