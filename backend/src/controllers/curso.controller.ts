import { Request, Response } from 'express';
import CursoDTO from '../dtos/curso.dto';
import { Curso } from '../models/curso.model';
import { handleError } from '../utils/error.handler';
import { DtoValidator } from '../utils/dto.validador';

/**
 * Controlador para gestionar operaciones CRUD de cursos
 */
export class CursoController {
  /**
   * Obtiene la lista de todos los cursos
   * @param req Solicitud HTTP
   * @param res Respuesta HTTP
   */
  public static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const cursos = await Curso.findAll();
      res.status(200).json(cursos);
    } catch (error) {
      handleError(res, error, 'Error al obtener la lista de cursos');
    }
  }

  /**
   * Busca un curso por su ID
   * @param req Solicitud HTTP con el ID en los parámetros
   * @param res Respuesta HTTP
   */
  public static async obtenerPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const curso = await Curso.findOne({ where: { id } });
      
      if (curso) {
        res.status(200).json(curso);
      } else {
        res.status(404).json({
            mensaje: `No se encontró el curso con ID ${id}`
        });
      }
    } catch (error) {
      handleError(res, error, 'Error al buscar el curso');
    }
  }

  /**
   * Crea un nuevo curso
   * @param req Solicitud HTTP con los datos del curso en el body
   * @param res Respuesta HTTP
   */
  public static async crear(req: Request, res: Response): Promise<void> {
    try {
      console.log(req);
      // Validar datos de entrada y manejar errores automáticamente
      const datosValidados = await DtoValidator.validateAndRespond(CursoDTO, req.body, res);
      
      // Si hay errores de validación, validateAndRespond ya respondió
      if (!datosValidados) return;

      // Crear el curso con los datos validados
       await Curso.create({
        grado: datosValidados.grado,
        grupo: datosValidados.grupo,
        nivel: datosValidados.nivel
      });

      res.status(201).json({
        mensaje: `Curso ${datosValidados.grado} creado exitosamente`,
      });

    } catch (error) {
      handleError(res, error, 'Error al crear el curso');
    }
  }

  /**
   * Actualiza un curso existente
   * @param req Solicitud HTTP con el ID en los parámetros y los datos en el body
   * @param res Respuesta HTTP
   */
  public static async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      // Verificar que el curso existe
      const cursoExistente = await Curso.findOne({ where: { id } });
      
      if (!cursoExistente) {
        res.status(404).json({
          mensaje: `No se encontró el curso con ID ${id}`
        });
        return;
      }

      // Validar datos de entrada y manejar errores automáticamente
      const datosValidados = await DtoValidator.validateAndRespond(CursoDTO, req.body, res);
      
      // Si hay errores de validación, validateAndRespond ya respondió
      if (!datosValidados) return;

      // Actualizar el curso con los datos validados
      const [filasActualizadas] = await Curso.update({
        grado: datosValidados.grado,
        grupo: datosValidados.grupo,
        nivel: datosValidados.nivel
      }, { where: { id } });

      if (filasActualizadas > 0) {
        await Curso.findOne({ where: { id } });
        res.status(200).json({
          mensaje: `Curso ${datosValidados.grado} actualizado exitosamente`,
        });
      } else {
        res.status(200).json({
          mensaje: 'No se realizaron cambios en el curso'
        });
      }
    } catch (error) {
      handleError(res, error, 'Error al actualizar el curso');
    }
  }

  /**
   * Elimina un curso por su ID
   * @param req Solicitud HTTP con el ID en los parámetros
   * @param res Respuesta HTTP
   */
  public static async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const filasEliminadas = await Curso.destroy({ where: { id } });
      
      if (filasEliminadas > 0) {
        res.status(200).json({
          mensaje: `Curso con ID ${id} eliminado exitosamente`
        });
      } else {
        res.status(404).json({
          mensaje: `No se encontró el curso con ID ${id}`
        });
      }
    } catch (error) {
      handleError(res, error, 'Error al eliminar el curso');
    }
  }
}