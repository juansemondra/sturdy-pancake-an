import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conductor } from './conductor.model';

@Injectable({
  providedIn: 'root',
})
export class ConductorService {
  private apiUrl = 'http://localhost:8080/api/conductores';  

  constructor(private http: HttpClient) {}

  getConductores(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(this.apiUrl);
  }

  getConductor(id: number): Observable<Conductor> {
    return this.http.get<Conductor>(`${this.apiUrl}/${id}`);
  }

  createConductor(conductor: Conductor): Observable<Conductor> {
    return this.http.post<Conductor>(this.apiUrl, conductor);
  }

  updateConductor(conductor: Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(`${this.apiUrl}/${conductor.id}`, conductor);
  }

  deleteConductor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}