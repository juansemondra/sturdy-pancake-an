import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConductorService } from './conductor.service';
import { Conductor } from './conductor.model';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-conductor',
  standalone: true,
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css'],
  imports: [CommonModule, ListComponent],
})
export class ConductorComponent implements OnInit {
  conductores: Conductor[] = [];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'telefono', header: 'Teléfono' },
    { field: 'direccion', header: 'Dirección' },
  ];

  private conductorService = inject(ConductorService);

  ngOnInit(): void {
    this.getConductores();
    //console result
    console.log(this.conductores);
  }

  getConductores(): void {
    this.conductorService.getConductores().subscribe((data: Conductor[]) => {
      this.conductores = data;
    });
  }

  onEdit(conductor: Conductor): void {
    // Implement navigation to edit form
    console.log('Edit conductor:', conductor);
  }

  onDelete(conductor: Conductor): void {
    if (conductor.id !== undefined) {
      this.conductorService.deleteConductor(conductor.id).subscribe(() => {
        this.getConductores();
      });
    } else {
      console.error('Error: id es undefined y no puede eliminarse');
    }
  }

  createConductor(): void {
    // Implement navigation to create form
    console.log('Navigate to create conductor form');
  }
}
