import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../interfaces/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cursos'
  }

  getLista(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  buscar(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.myAppUrl}${this.myApiUrl}` +'/'+ id)
  }

  save(curso: Curso): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, curso)
  }

  update(id:number, curso:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, curso); 
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }
}
