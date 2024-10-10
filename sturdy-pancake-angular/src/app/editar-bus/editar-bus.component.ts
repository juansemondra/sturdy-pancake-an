import { Component, OnInit } from '@angular/core';
import { Bus } from '../bus/bus.model';
import { BusService } from '../bus/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-bus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-bus.component.html',
  styleUrls: ['./editar-bus.component.css'],
})
export class EditarBusComponent implements OnInit {
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
  ngOnInit(): void {
    const busId = this.route.snapshot.paramMap.get('id');
    if (busId) {
      this.isLoading = true;
      this.busService.getBus(+busId).subscribe({
        next: (data) => {
          this.bus = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching bus:', error);
          this.errorMessage = 'Failed to load bus details.';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Invalid bus ID.';
    }
  }

  onSubmit(): void {
    if (!this.bus.id) {
      this.errorMessage = 'Bus ID is missing.';
      return;
    }
    if (!this.bus.placa || !this.bus.modelo) {
      this.errorMessage = 'Placa and Modelo are required.';
      return;
    }

    this.isLoading = true;
    this.busService.updateBus(this.bus).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Bus updated successfully!');
        this.router.navigate(['/buses']); // Navigate back to the bus list
      },
      error: (error) => {
        console.error('Error updating bus:', error);
        this.errorMessage = 'Failed to update bus.';
        this.isLoading = false;
      },
    });
  }
}
