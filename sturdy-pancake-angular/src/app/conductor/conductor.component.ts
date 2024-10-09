import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConductorService } from './conductor.service';
import { Conductor } from './conductor.model';
import { ListComponent } from '../list/list.component';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router,
    private conductorService: ConductorService
  ) {}

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
    this.router.navigate(['/conductores/editar', conductor.id]);
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
    this.router.navigate(['/conductores/crear']);
  }
}
