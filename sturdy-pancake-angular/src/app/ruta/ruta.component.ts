import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RutaService } from './ruta.service';
import { Ruta } from './ruta.model';

@Component({
  selector: 'app-ruta',
  standalone: true,
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css'],
  imports: [FormsModule, CommonModule] 
})
export class RutaComponent {
  rutas: Ruta[] = [];
  selectedRuta: Ruta = { nombreRuta: '', horarioDeInicio: '', horarioDeFinal: '', diasDisponibles: '' };

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

  createRuta(nombreRuta: string, horarioDeInicio: string, horarioDeFinal: string, diasDisponibles: string): void {
    const newRuta: Ruta = { 
      nombreRuta, 
      horarioDeInicio, 
      horarioDeFinal, 
      diasDisponibles, 
      relacionBusRutaConductorIds: [], 
      estacionIds: []
    };
    this.rutaService.createRuta(newRuta).subscribe(() => {
      this.getRutas();
    });
  }

  updateRuta(): void {
    if (this.selectedRuta && this.selectedRuta.id) {
      this.rutaService.updateRuta(this.selectedRuta).subscribe(() => {
        this.getRutas();
      });
    }
  }

  deleteRuta(id: number | undefined): void {
    if (id) {  
      this.rutaService.deleteRuta(id).subscribe(() => {
        this.getRutas();
      });
    }
  }
}