import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrUtils } from 'src/app/utils/toast.utils';

import { ErrorResponse } from 'src/app//interfaces/errores'
import { Curso} from 'src/app/interfaces/curso';
import { CursoService } from 'src/app/services/curso';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html'
})
export class CrearEditarComponent implements OnInit {
  form: FormGroup<any>;
  loading: boolean = false;
  id: number = 0;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _cursoService: CursoService,
    private router: Router,
    private toastrUtils: ToastrUtils,
    private aRouter: ActivatedRoute
  ){
    this.form = this.fb.group({
      grado: ['', Validators.required],
      //telefono: ['',[   , Validators.pattern('^\\+?[1-9]\\d{1,14}$'),Validators.required]],
      grupo: [null, Validators.required],
      nivel: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.Buscar(this.id);
    }
  }

  async Buscar(id: number) {
    try {
      this.loading = true;
      const data = await firstValueFrom(this._cursoService.buscar(id));
      this.form.setValue({
        grado: data.grado,
        grupo: data.grupo,
        nivel: data.nivel
      });
    } catch (error) {
      console.error('Error al buscar curso:', error);
    } finally {
      this.loading = false;
    }
  }
  /**
   * Guarda o actualiza un curso usando async/await
   */
  async Save(): Promise<void> {
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const curso: Curso = {
      grado: this.form.value.grado.trim(),
      grupo: this.form.value.grupo.trim(),
      nivel: this.form.value.nivel.trim()
    };
    
    try {
      this.loading = true;
      if (this.id !== 0) {
        await firstValueFrom(this._cursoService.update(this.id, curso));
        this.toastrUtils.mostrarMensaje('Éxito',`Curso ${curso.grado} actualizado`,'success');

      } else {
        await firstValueFrom(this._cursoService.save(curso)); // Removido await duplicado
        this.toastrUtils.mostrarMensaje('Éxito',`Curso ${curso.grado} registrado`,'success');
      }
      this.router.navigate(['/curso']);
    } catch (error) {
      console.error('Error HTTP:', error);
    } finally {
      this.loading = false;
    }
  }

}
