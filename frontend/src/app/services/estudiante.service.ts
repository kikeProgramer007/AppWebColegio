import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../interfaces/estudiante';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private httpErrorService: ErrorService
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/estudiantes'
  }

  getLista(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  buscar(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  save(estudiante: Estudiante): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, estudiante)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

   update(id: number, estudiante: Estudiante): Observable<any> {
    return  this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, estudiante)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }
}
