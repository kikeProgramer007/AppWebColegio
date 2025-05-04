import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/interfaces/curso';
import { CursoService } from 'src/app/services/curso';

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
    private toastr: ToastrService,
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

  Buscar(id: number) {
    this.loading = true;
    this._cursoService.buscar(id).subscribe((data:Curso) => {
      this.loading = false;
      this.form.setValue({
        grado: data.grupo,
        grupo: data.grupo,
        nivel: data.nivel
      })
    })
  }

  Save() {
    const curso: Curso = {
      grado: this.form.value.grado,
      grupo: this.form.value.grupo,
      nivel: this.form.value.nivel
    }

    this.loading = true;

    if (this.id !== 0) {
      // Es editar 
      //curso.id = this.id;
    
      this._cursoService.update(this.id, curso).subscribe(() => {
        this.toastr.info(`El curso ${curso.grado} fue actualizado con exito`, 'Curso actualizado');
        this.loading = false;
        this.router.navigate(['/curso']);
      })

    } else {
      // Es agregar
      console.log(curso);
      this._cursoService.save(curso).subscribe(() => {
        this.toastr.success(`El curso ${curso.grado} fue registrado con exito`, 'Curso registrado');
        this.loading = false;
        this.router.navigate(['/curso']);
      })
    }
  }

}
