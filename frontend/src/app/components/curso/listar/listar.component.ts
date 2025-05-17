import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/interfaces/curso';
import { CursoService } from 'src/app/services/curso';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {

  Lista: Curso[] = []
  loading: boolean = false;

  constructor(
    private _cursoService: CursoService,
    private _sweetAlert: SweetAlertService,
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

  async Delete(id: number) {
    const result = await this._sweetAlert.mostrarConfirmacion(
      "¿Estás seguro?",
      "¡No podrás revertir esta acción!"
    );

    // Verificar si el usuario confirmó la eliminación
    if (result.isConfirmed) {
      // Si el usuario confirma, procedemos con la eliminación
      this.loading = true;
      this._cursoService.delete(id).subscribe(() => {
        this.GetList();
        this.toastr.error(`El Registro fue eliminado con éxito`, 'Curso Eliminado');
      });
    }

  }

}
