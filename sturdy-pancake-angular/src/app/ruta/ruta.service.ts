import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from './ruta.model';

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  private apiUrl = 'http://localhost:8080/api/rutas'; 

  constructor(private http: HttpClient) {}

  getRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.apiUrl);
  }

  getRuta(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.apiUrl}/${id}`);
  }

  createRuta(ruta: Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(this.apiUrl, ruta);
  }

  updateRuta(ruta: Ruta): Observable<Ruta> {
    return this.http.put<Ruta>(`${this.apiUrl}/${ruta.id}`, ruta);
  }

  deleteRuta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}