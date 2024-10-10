import { Component } from '@angular/core';
import { Bus } from '../bus/bus.model';
import { BusService } from '../bus/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-bus',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-bus.component.html',
  styleUrls: ['./crear-bus.component.css'],
})
export class CrearBusComponent {
  bus: Bus = {
    placa: '',
    modelo: '',
  };

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    public busService: BusService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  onSubmit(): void {
    if (!this.bus.placa || !this.bus.modelo) {
      this.errorMessage = 'Placa and Modelo are required.';
      return;
    }

    this.isLoading = true;
    this.busService.createBus(this.bus).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Bus created successfully!');
        this.router.navigate(['/buses']); // Navigate back to the bus list
      },
      error: (error) => {
        console.error('Error creating bus:', error);
        this.errorMessage = 'Failed to create bus.';
        this.isLoading = false;
      },
    });
  }
}
