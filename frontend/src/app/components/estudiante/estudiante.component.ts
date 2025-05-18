import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrUtils } from 'src/app/utils/toast.utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
declare var $: any; // Declara la variable global jQuery

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html'
})

export class EstudianteComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  // Formulario tipado con la interfaz Estudiante
  form: FormGroup<any>;
  
  Lista: Estudiante[] = [];

  loading: boolean = false;
  accion = 'Agregar';
  id: number = 0;

  // Configuración de validaciones centralizada
  private readonly validationConfig = {
    cedula_identidad: [null, Validators.required],
    codigo_rude: [null, Validators.required],
    nombre: ['', Validators.required],
    apellido_paterno: [null, Validators.required],
    apellido_materno: [null, Validators.required],
    genero: [null, Validators.required],
    fecha_nacimiento: [null, Validators.required],
  };

  constructor(
    private _estudianteService: EstudianteService,
    private _sweetAlert: SweetAlertService,
    private toastrUtils: ToastrUtils,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(this.validationConfig);
  }
  ngOnInit(): void {
    this.GetList();
  }

  GetList(): void {
    this.loading = true;
    this._estudianteService.getLista().subscribe({
      next: (data) => {
        this.Lista = data;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  AbrirModal(){
    this.accion = 'Agregar';
    this.resetForm();
    this.openModal();
  }

  async Save() { 

    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    } 

    const estudiante: Estudiante = { 
      codigo_rude: this.form.value.codigo_rude.trim(), 
      cedula_identidad: this.form.value.cedula_identidad.trim(), 
      nombre: this.form.value.nombre.trim(), 
      apellido_paterno: this.form.value.apellido_paterno.trim(), 
      apellido_materno: this.form.value.apellido_materno.trim(), 
      genero: this.form.value.genero.trim(), 
      fecha_nacimiento: this.form.value.fecha_nacimiento.trim() 
    }; 

    this.loading = true; 

    if (this.id !== 0) { 
      this._estudianteService.update(this.id, estudiante).subscribe({ 
        next: (result) => { 
          this.closeModal(); 
          this.GetList();  
          this.toastrUtils.mostrarMensaje('Éxito', result.mensaje, 'success'); 
        } 
      })  
    } else { 

      this._estudianteService.save(estudiante).subscribe({ 
        next: (result) => { 
          this.closeModal(); 
          this.GetList();  
          this.toastrUtils.mostrarMensaje('Éxito', result.mensaje, 'success'); 
        } 
      })  
    }
    this.toastrUtils.limpiar(); 
    this.loading = false; 
  }


  Update(estudiante: Estudiante): void {
    this.accion = 'Actualizar';
    this.id = estudiante.id!;
    const { id, ...formData } = estudiante;
    this.form.patchValue(formData);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.openModal();
  }


  async Delete(id: number) {
    const result = await this._sweetAlert.mostrarConfirmacion();
    if (result.isConfirmed) {
      this.loading = true;
      this._estudianteService.delete(id).subscribe({
        next: (result) => {
          this.GetList();
          this.toastrUtils.mostrarMensaje('Estudiante Eliminado', result.message, 'info');
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }


  openModal() {
    $('#myModal').modal('show');
  }

  closeModal() {
    $('#myModal').modal('hide');
  }

  private resetForm(): void {
    this.id = 0;
    this.form.reset();
  }
}
