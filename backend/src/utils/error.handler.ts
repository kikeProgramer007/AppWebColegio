import { Response } from 'express';

/**
 * Tipo para errores con propiedades adicionales
 */
interface ExtendedError extends Error {
  code?: string | number;
  sqlMessage?: string;
  sqlState?: string;
}

/**
 * Manejador centralizado de errores para respuestas HTTP
 * 
 * @param res - Objeto de respuesta Express
 * @param error - Error capturado
 * @param mensaje - Mensaje personalizado para la respuesta
 * @param statusCode - Código de estado HTTP (opcional, por defecto 500)
 */
export const handleError = (
  res: Response, 
  error: unknown, 
  mensaje: string, 
  statusCode = 500
): void => {
  // Convertir error a un tipo conocido
  const err = error as ExtendedError;
  
  // Registrar el error en consola con información detallada
  console.error(`[ERROR] ${mensaje}:`, {
    message: err.message,
    stack: err.stack,
    code: err.code,
    sqlMessage: err.sqlMessage,
    sqlState: err.sqlState
  });

  // Determinar si estamos en producción
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Crear respuesta de error
  const errorResponse = {
    success: false,
    mensaje: mensaje,
    error: isProduction 
      ? 'Ha ocurrido un error en el servidor'
      : {
          message: err.message,
          ...(err.code && { code: err.code }),
          ...(err.sqlMessage && { sqlMessage: err.sqlMessage })
        }
  };

  // Enviar respuesta con código de estado apropiado
  res.status(statusCode).json(errorResponse);
};

/**
 * Manejador para errores de validación
 * 
 * @param res - Objeto de respuesta Express
 * @param errores - Array de errores de validación
 * @param mensaje - Mensaje personalizado para la respuesta
 */
export const handleValidationError = (
  res: Response,
  errores: any[],
  mensaje = 'Error de validación'
): void => {
  res.status(400).json({
    success: false,
    mensaje: mensaje,
    errores: errores.map(err => ({
      propiedad: err.property,
      mensajes: Object.values(err.constraints || {})
    }))
  });
};