import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from '../interfaces/curso';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private httpErrorService: ErrorService
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cursos'
  }

  getLista(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  buscar(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  save(curso: Curso): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, curso)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  update(id: number, curso: Curso): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, curso)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`)
      .pipe(catchError(error => this.httpErrorService.handleError(error)));
  }
}
