
import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  mostrarMensaje(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'success') {
    Swal.fire(titulo, mensaje, tipo);
  }

  async mostrarConfirmacion(titulo: string ='¿Estás seguro?', mensaje: string = '¡No podrás revertir esta acción!'): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    });
  }
}

