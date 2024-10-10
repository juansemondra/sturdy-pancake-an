import { Component } from '@angular/core';
import { Conductor } from '../conductor/conductor.model';
import { Router } from '@angular/router';
import { ConductorService } from '../conductor/conductor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-conductor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-conductor.component.html',
  styleUrl: './crear-conductor.component.css',
})
export class CrearConductorComponent {
  conductor: Conductor = {
    nombre: '',
    cedula: '',
    telefono: 0,
    direccion: '',
  };

  constructor(
    private conductorService: ConductorService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.conductorService.createConductor(this.conductor).subscribe({
      next: () => {
        this.router.navigate(['/conductores']);
      },
      error: (err) => {
        console.error('Error creating conductor:', err);
      },
    });
  }
}
