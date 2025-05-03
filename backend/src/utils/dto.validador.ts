import { validate, ValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

/**
 * Interfaz para respuesta de errores de validación
 */
export interface ValidationErrorResponse {
  propiedad: string;
  mensajes: string[];
}

/**
 * Resultado de la validación
 */
export interface ValidationResult<T> {
  isValid: boolean;
  instance: T;
  errors?: ValidationErrorResponse[];
}

/**
 * Clase para validar DTOs reutilizable en toda la aplicación
 */
export class DtoValidator {
  /**
   * Valida un DTO basado en su clase y los datos proporcionados
   * 
   * @param dtoClass - Clase del DTO a validar
   * @param data - Datos a validar
   * @returns Resultado de la validación
   */
  public static async validate<T extends object>(
    dtoClass: ClassConstructor<T>,
    data: any
  ): Promise<ValidationResult<T>> {
    // Convertir datos planos a instancia de la clase DTO
    const dtoInstance = plainToInstance(dtoClass, data);
    
    // Validar la instancia
    const validationErrors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true
    });
    
    // Si no hay errores, retornar éxito
    if (validationErrors.length === 0) {
      return { 
        isValid: true, 
        instance: dtoInstance 
      };
    }
    
    // Mapear errores a un formato estándar
    const formattedErrors = this.formatValidationErrors(validationErrors);
    
    return { 
      isValid: false, 
      instance: dtoInstance,
      errors: formattedErrors
    };
  }
  
  /**
   * Formatea los errores de validación a un formato estándar
   * 
   * @param errors - Errores de validación de class-validator
   * @returns Errores formateados
   */
  private static formatValidationErrors(
    errors: ValidationError[]
  ): ValidationErrorResponse[] {
    return errors.map(err => ({
      propiedad: err.property,
      mensajes: Object.values(err.constraints || {})
    }));
  }
  
  /**
   * Middleware para validar DTOs en rutas Express
   * 
   * @param dtoClass - Clase del DTO a validar
   * @param source - Fuente de datos (body, query, params)
   * @returns Middleware de Express
   */
  public static validateMiddleware<T extends object>(
    dtoClass: ClassConstructor<T>,
    source: 'body' | 'query' | 'params' = 'body'
  ) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const result = await this.validate(dtoClass, req[source]);
        
        if (!result.isValid && result.errors) {
          res.status(400).json({
            success: false,
            mensaje: 'Error de validación',
            errores: result.errors
          });
          return;
        }
        
        // Asignar la instancia validada y transformada de vuelta a la fuente
        req[source] = result.instance;
        next();
      } catch (error) {
        res.status(500).json({
          success: false,
          mensaje: 'Error en la validación',
          error: process.env.NODE_ENV === 'production' 
            ? 'Error interno del servidor' 
            : (error as Error).message
        });
      }
    };
  }

  /**
   * Valida y maneja la respuesta en caso de error
   * 
   * @param dtoClass - Clase del DTO a validar
   * @param data - Datos a validar
   * @param res - Objeto Response de Express
   * @returns Si es válido, devuelve la instancia validada; si no, envía una respuesta de error y retorna null
   */
  public static async validateAndRespond<T extends object>(
    dtoClass: ClassConstructor<T>,
    data: any,
    res: Response
  ): Promise<T | null> {
    const result = await this.validate(dtoClass, data);
    
    if (!result.isValid && result.errors) {
      res.status(400).json({
        success: false,
        mensaje: 'Error de validación',
        errores: result.errors
      });
      return null;
    }
    
    return result.instance;
  }
}