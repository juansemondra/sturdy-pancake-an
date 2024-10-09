import { Component, OnInit } from '@angular/core';
import { RelacionBusRutaConductor } from './relacion-bus-ruta-conductor.model';
import { RelacionBusRutaConductorService } from './relacion-bus-ruta-conductor.service';

@Component({
  selector: 'app-relacion-bus-ruta-conductor',
  standalone: true,
  imports: [],
  templateUrl: './relacion-bus-ruta-conductor.component.html',
  styleUrl: './relacion-bus-ruta-conductor.component.css',
})
export class RelacionBusRutaConductorComponent implements OnInit {
  relaciones: RelacionBusRutaConductor[] = [];

  constructor(private relacionService: RelacionBusRutaConductorService) {}

  ngOnInit(): void {
    this.loadRelaciones();
  }

  loadRelaciones(): void {
    this.relacionService
      .getRelaciones()
      .subscribe((data: RelacionBusRutaConductor[]) => {
        this.relaciones = data;
      });
  }

  deleteRelacion(id: number): void {
    this.relacionService.deleteRelacion(id).subscribe(() => {
      this.relaciones = this.relaciones.filter(
        (relacion) => relacion.id !== id
      );
    });
  }
}
