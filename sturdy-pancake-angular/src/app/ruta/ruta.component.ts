import { Component, OnInit } from '@angular/core';
import { RutaService } from './ruta.service';
import { Ruta } from './ruta.model';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css'],
})
export class RutaComponent implements OnInit {
  rutas: Ruta[] = [];
  selectedRuta: Ruta | null = null;

  constructor(private rutaService: RutaService) {}

  ngOnInit(): void {
    this.getRutas();
  }

  getRutas(): void {
    this.rutaService.getRutas().subscribe((data: Ruta[]) => {
      this.rutas = data;
    });
  }

  onSelect(ruta: Ruta): void {
    this.selectedRuta = ruta;
  }

  createRuta(ruta: Ruta): void {
    this.rutaService.createRuta(ruta).subscribe(() => {
      this.getRutas();
    });
  }

  updateRuta(ruta: Ruta): void {
    if (ruta.id) {
      this.rutaService.updateRuta(ruta).subscribe(() => {
        this.getRutas();
      });
    }
  }

  deleteRuta(id: number): void {
    this.rutaService.deleteRuta(id).subscribe(() => {
      this.getRutas();
    });
  }
}