import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConductorService } from './conductor.service';
import { Conductor } from './conductor.model';

@Component({
  selector: 'app-conductor',
  standalone: true,
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ConductorComponent {
  conductores: Conductor[] = [];
  selectedConductor: Conductor = { nombre: '', telefono: 0 };

  constructor(private conductorService: ConductorService) {}

  ngOnInit(): void {
    this.getConductores();
  }

  getConductores(): void {
    this.conductorService.getConductores().subscribe((data: Conductor[]) => {
      this.conductores = data;
    });
  }

  onSelect(conductor: Conductor): void {
    this.selectedConductor = conductor;
  }

  createConductor(nombre: string, telefono: string): void {
    const telefonoNumber = parseInt(telefono, 10); // Convertir a número
    const newConductor: Conductor = {
      nombre,
      telefono: telefonoNumber,
      relacionBusRutaConductorIds: [],
    };
    this.conductorService.createConductor(newConductor).subscribe(() => {
      this.getConductores();
    });
  }

  updateConductor(): void {
    if (this.selectedConductor && this.selectedConductor.id) {
      this.conductorService
        .updateConductor(this.selectedConductor)
        .subscribe(() => {
          this.getConductores();
        });
    }
  }

  deleteConductor(id: number | undefined): void {
    if (id !== undefined) {
      this.conductorService.deleteConductor(id).subscribe(() => {
        this.getConductores();
      });
    } else {
      console.error('Error: id es undefined y no puede eliminarse');
    }
  }
}
