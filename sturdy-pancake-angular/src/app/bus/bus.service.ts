import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Bus } from './bus.model';
import { RelacionBusRutaConductorService } from '../relacion-bus-ruta-conductor/relacion-bus-ruta-conductor.service';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private apiUrl = 'http://localhost:8080/api/buses';

  constructor(
    private http: HttpClient,
    private relacionService: RelacionBusRutaConductorService
  ) {}

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getBus(id: number): Observable<Bus> {
    return this.http
      .get<Bus>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBus(bus: Bus): Observable<Bus> {
    return this.http
      .post<Bus>(this.apiUrl, bus)
      .pipe(catchError(this.handleError));
  }

  updateBus(bus: Bus): Observable<Bus> {
    return this.http
      .put<Bus>(`${this.apiUrl}/${bus.id}`, bus)
      .pipe(catchError(this.handleError));
  }

  // Enhanced deleteBus method with driver assignment check
  deleteBus(id: number): Observable<void> {
    // Fetch all relaciones
    return this.relacionService.getRelaciones().pipe(
      map((relaciones) =>
        relaciones.filter((relacion) => relacion.busId === id)
      ),
      switchMap((filteredRelaciones) => {
        if (filteredRelaciones.length > 0) {
          // Bus has assigned drivers; throw an error
          return throwError(
            () => new Error('Cannot delete bus with assigned drivers.')
          );
        } else {
          // No assigned drivers; proceed to delete
          return this.http
            .delete<void>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Customize error handling as needed
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
