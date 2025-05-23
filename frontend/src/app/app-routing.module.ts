import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
// Guards
import { AuthGuard } from './utils/auth.guard';
import { ListarComponent } from './components/curso/listar/listar.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { CrearEditarComponent } from './components/curso/crear-editar/crear-editar.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'curso', component: ListarComponent },
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'curso/crear', component: CrearEditarComponent },
  { path: 'curso/editar/:id', component: CrearEditarComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
