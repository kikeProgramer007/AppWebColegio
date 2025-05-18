import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrUtils } from 'src/app/utils/toast.utils';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../interfaces/errores';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  
  constructor(private toastrUtils: ToastrUtils) { }

  /**
   * Maneja errores HTTP y los transforma en un formato estandarizado
   * 
   * @param error Error HTTP recibido
   * @returns Observable con estructura de error estandarizada
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorResponse: ErrorResponse;
    
    // Error de validación (400)
    if (error.status === 400 && error.error?.errores) {
      errorResponse = error.error as ErrorResponse;
    } 
    // Error de autenticación (401)
    else if (error.status === 401) {
      errorResponse = {
        mensaje: 'No tiene autorización para realizar esta acción',
        errores: ['Se requiere iniciar sesión']
      };
    } 
    // Error de acceso prohibido (403)
    else if (error.status === 403) {
      errorResponse = {
        mensaje: 'Acceso denegado',
        errores: [error.error?.mensaje || error.message || 'No tiene permisos para realizar esta acción']
      };
    }
    // Error de recurso no encontrado (404)
    else if (error.status === 404) {
      errorResponse = {
        mensaje: 'Recurso no encontrado',
        errores: [error.error?.mensaje || error.message ||'El recurso solicitado no existe o ha sido eliminado']
      };
    }
    // Error de conflicto (409)
    else if (error.status === 409) {
      errorResponse = {
        mensaje: 'Conflicto con el estado actual',
        errores: [error.error?.mensaje || 'La operación no puede completarse por un conflicto']
      };
    }
    // Error de tiempo de espera (timeout)
    else if (error.status === 0 && error.error instanceof ProgressEvent) {
      errorResponse = {
        mensaje: 'Error de conexión',
        errores: ['No se pudo establecer conexión con el servidor. Verifique su conexión a Internet.']
      };
    }
    // Errores de servidor (500, etc)
    else {
      errorResponse = {
        mensaje: 'Error en el servidor',
        errores: [error.error?.mensaje || error.message || 'Error desconocido en el servidor']
      };
    }
    
    this.toastrUtils.mostrarListaDeErrores( errorResponse.mensaje, errorResponse.errores);
   
    return throwError(() => errorResponse);
  }
}
