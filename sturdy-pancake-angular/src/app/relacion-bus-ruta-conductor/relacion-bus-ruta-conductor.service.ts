import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelacionBusRutaConductor } from './relacion-bus-ruta-conductor.model';

@Injectable({
  providedIn: 'root',
})
export class RelacionBusRutaConductorService {
  private apiUrl = 'http://localhost:8080/api/relaciones'; // API URL

  constructor(private http: HttpClient) {}

  getRelaciones(): Observable<RelacionBusRutaConductor[]> {
    return this.http.get<RelacionBusRutaConductor[]>(this.apiUrl);
  }

  getRelacion(id: number): Observable<RelacionBusRutaConductor> {
    return this.http.get<RelacionBusRutaConductor>(`${this.apiUrl}/${id}`);
  }

  // New method to get relations by conductorId
  getRelacionesByConductorId(
    conductorId: number
  ): Observable<RelacionBusRutaConductor[]> {
    return this.http.get<RelacionBusRutaConductor[]>(
      `${this.apiUrl}?conductorId=${conductorId}`
    );
  }

  createRelacion(
    relacion: RelacionBusRutaConductor
  ): Observable<RelacionBusRutaConductor> {
    return this.http.post<RelacionBusRutaConductor>(this.apiUrl, relacion);
  }

  updateRelacion(
    relacion: RelacionBusRutaConductor
  ): Observable<RelacionBusRutaConductor> {
    return this.http.put<RelacionBusRutaConductor>(
      `${this.apiUrl}/${relacion.id}`,
      relacion
    );
  }

  deleteRelacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
