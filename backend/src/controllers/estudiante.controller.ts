import { Request, Response } from 'express';
import EstudianteDTO from '../dtos/estudiante.dto';
import { Estudiante } from '../models/estudiante.model';
import { handleError } from '../utils/error.handler';
import { DtoValidator } from '../utils/dto.validador';

/**
 * Controlador para operaciones CRUD de Estudiantes
 */
export class EstudianteController {
  /**
   * GET /estudiantes
   */
  public static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const estudiantes = await Estudiante.findAll();
      res.status(200).json(estudiantes);
    } catch (error) {
      handleError(res, error, 'Error al obtener la lista de estudiantes');
    }
  }

  /**
   * GET /estudiantes/:id
   */
  public static async obtenerPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const estudiante = await Estudiante.findOne({ where: { id } });
      if (estudiante) {
        res.status(200).json(estudiante);
      } else {
        res.status(404).json({ mensaje: `No se encontró el estudiante con ID ${id}` });
      }
    } catch (error) {
      handleError(res, error, 'Error al buscar el estudiante');
    }
  }

  /**
   * POST /estudiantes
   */
  public static async crear(req: Request, res: Response): Promise<void> {
    try {
      const datosValidados = await DtoValidator.validateAndRespond(EstudianteDTO, req.body, res);
      if (!datosValidados) return;

      const nuevo = await Estudiante.create({
        codigo_rude: datosValidados.codigo_rude,
        cedula_identidad: datosValidados.cedula_identidad,
        nombre: datosValidados.nombre,
        apellido_paterno: datosValidados.apellido_paterno,
        apellido_materno: datosValidados.apellido_materno,
        genero: datosValidados.genero,
        fecha_nacimiento: datosValidados.fecha_nacimiento,
      });

      res.status(201).json({ mensaje: 'Estudiante creado exitosamente', data: nuevo });
    } catch (error) {
      handleError(res, error, 'Error al crear el estudiante');
    }
  }

  /**
   * PUT /estudiantes/:id
   */
  public static async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const existente = await Estudiante.findOne({ where: { id } });
      if (!existente) {
        res.status(404).json({ mensaje: `No se encontró el estudiante con ID ${id}` });
        return;
      }

      const datosValidados = await DtoValidator.validateAndRespond(EstudianteDTO, req.body, res);
      if (!datosValidados) return;

      const [modificados] = await Estudiante.update({
        codigo_rude: datosValidados.codigo_rude,
        cedula_identidad: datosValidados.cedula_identidad,
        nombre: datosValidados.nombre,
        apellido_paterno: datosValidados.apellido_paterno,
        apellido_materno: datosValidados.apellido_materno,
        genero: datosValidados.genero,
        fecha_nacimiento: datosValidados.fecha_nacimiento,
      }, { where: { id } });

      if (modificados > 0) {
        const actualizado = await Estudiante.findOne({ where: { id } });
        res.status(200).json({ mensaje: 'Estudiante actualizado exitosamente', data: actualizado });
      } else {
        res.status(200).json({ mensaje: 'No se realizaron cambios' });
      }
    } catch (error) {
      handleError(res, error, 'Error al actualizar el estudiante');
    }
  }

  /**
   * DELETE /estudiantes/:id
   */
  public static async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const borrado = await Estudiante.destroy({ where: { id } });
      if (borrado) {
        res.status(200).json({ mensaje: `Estudiante con ID ${id} eliminado exitosamente` });
      } else {
        res.status(404).json({ mensaje: `No se encontró el estudiante con ID ${id}` });
      }
    } catch (error) {
      handleError(res, error, 'Error al eliminar el estudiante');
    }
  }
}
