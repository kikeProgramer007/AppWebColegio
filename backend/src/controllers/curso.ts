import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CursoDTO } from '../dtos/cursoDTO';
import { Curso } from '../models/curso';

export const GetLista = async (req: Request, res: Response) => {
    const lstAll = await Curso.findAll();
    res.json(lstAll)
}

export const Buscar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const oCurso = await Curso.findOne({ where: { id } });
        
        if (oCurso) {
            res.status(200).json(oCurso);
        } else {
            res.status(404).json({
                msg: 'Curso no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const Crear = async (req: Request, res: Response) => {

    const datos = plainToInstance(CursoDTO, req.body);
    // Validamos
    const errores = await validate(datos);
    if (errores.length > 0) {
        // Retornamos errores si hay
        return res.status(400).json({
            errors: errores.map(err => ({
                propiedad: err.property,
                mensajes: Object.values(err.constraints || {})
            }))
        });
    }

    try {
          await Curso.create({
            grado: datos.grado,
            grupo: datos.grupo,
            nivel: datos.nivel,
        });

        res.json({
            msg: `Curso ${datos.grado} creado exitosamente!`
        });
     
    } catch (error: any) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error: { message: error.message }
        });
    }
}

export const Modificar = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Convertir el body en una instancia de CursoDTO
    const datos = plainToInstance(CursoDTO, req.body);
    const errores = await validate(datos);

    // Validación de errores
    if (errores.length > 0) {
        const mensajes = errores.map(err => Object.values(err.constraints || {})).flat();
        return res.status(400).json({
            msg: 'Errores de validación',
            errores: mensajes
        });
    }

    try {
        // Buscar el curso actual en la base de datos
        const oCurso = await Curso.findOne({ where: { id } });

        if (!oCurso) {
            return res.status(404).json({
                msg: 'Curso no encontrado',
            });
        }

        // Actualizamos el curso con los datos validados
        const [updated] = await Curso.update({
            grado: datos.grado,
            grupo: datos.grupo,
            nivel: datos.nivel,
        }, { where: { id } });

        if (updated) {
            const curso = await Curso.findOne({ where: { id } });
            res.status(200).json({
                msg: `Curso ${datos.grado} actualizado exitosamente!`,
                curso
            });
        } else {
            res.status(200).json({
                msg: 'No hay cambios para actualizar',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error al actualizar',
            error
        });
    }
};

export const Eliminar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar curso en la base de datos
        const deleted = await Curso.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Curso con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Curso no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}