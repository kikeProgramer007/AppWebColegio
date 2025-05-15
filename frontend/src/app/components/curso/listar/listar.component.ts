import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/interfaces/curso';
import { CursoService } from 'src/app/services/curso';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {

  Lista: Curso[] = []
  loading: boolean = false;

  constructor(
    private _cursoService: CursoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  
    this.GetList()
  }

  GetList() {
    this.loading = true;
    
    this._cursoService.getLista().subscribe((data: Curso[]) => {
      this.Lista = data;
      this.loading = false;
    })
  }

  Delete(id: number) {
    this.loading = true;
    this._cursoService.delete(id).subscribe(() => {
      this.GetList();
      this.toastr.error(`El Registro fue elimado con exito`, 'Curso Eliminado');
    })
  }

}
