import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastrUtils {

  // Opciones por defecto que se aplicarán a todos los toasts
  private defaultConfig: Partial<IndividualConfig> = {
    toastClass: 'ngx-toastr custom-toast',  // usa la clase global que definimos en styles.scss
    titleClass: 'toast-title',
    messageClass: 'toast-message',
    closeButton: true,
    progressBar: true,
    timeOut: 5000,
    enableHtml: true     // cambiar a `true` si quieres pasar HTML en el mensaje
  };

  constructor(private toastr: ToastrService) { }

  /**
   * Muestra un toast con viñetas y salto de línea.
   * @param titulo  Título que aparecerá en el toast
   * @param mensajes  Array de cadenas; cada elemento será una línea con viñeta
   * @param tipo  Tipo de toast ('success' | 'error' | 'warning' | 'info')
   * @param configOpcional Opciones adicionales que quieras pasar (sobreescriben defaultConfig)
   */
  mostrarListaDeErrores(
    titulo: string,
    mensajes: string[],
    tipo: ToastType = 'error',
    configOpcional?: Partial<IndividualConfig>
  ) {
    // Construye un solo string con viñetas y saltos de línea
    const listaConVinetas = '• ' + mensajes.join('<br>• ');

    const configFinal: Partial<IndividualConfig> = {
      ...this.defaultConfig,
      ...configOpcional
    };

    // Invoca el tipo de toast correspondiente
    switch (tipo) {
      case 'success':
        this.toastr.success(listaConVinetas, titulo, configFinal);
        break;
      case 'warning':
        this.toastr.warning(listaConVinetas, titulo, configFinal);
        break;
      case 'info':
        this.toastr.info(listaConVinetas, titulo, configFinal);
        break;
      case 'error':
      default:
        this.toastr.error(listaConVinetas, titulo, configFinal);
        break;
    }
  }


  /**
   * Muestra un toast simple (sin lista), enviando texto plano o HTML.
   * @param titulo  Título del toast
   * @param mensaje Texto o HTML (si enableHtml = true)
   * @param tipo    'success' | 'error' | 'warning' | 'info'
   * @param configOpcional  Opciones que quieras sobreescribir (por ejemplo: timeOut, enableHtml)
   */
  mostrarMensaje(
    titulo: string,
    mensaje: string,
    tipo: ToastType = 'success',
    configOpcional?: Partial<IndividualConfig>
  ) {
    const configFinal: Partial<IndividualConfig> = {
      ...this.defaultConfig,
      ...configOpcional
    };

    switch (tipo) {
      case 'success':
        this.toastr.success(mensaje, titulo, configFinal);
        break;
      case 'warning':
        this.toastr.warning(mensaje, titulo, configFinal);
        break;
      case 'info':
        this.toastr.info(mensaje, titulo, configFinal);
        break;
      case 'error':
      default:
        this.toastr.error(mensaje, titulo, configFinal);
        break;
    }
  }

  /**
   * Limpia todos los toasts visibles en pantalla.
   */
  limpiar() {
    this.toastr.clear();
  }
}
