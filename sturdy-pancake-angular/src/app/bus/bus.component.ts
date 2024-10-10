import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusService } from './bus.service';
import { Bus } from './bus.model';
import { ListComponent, ListColumn } from '../list/list.component'; // Adjust the path as necessary
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bus',
  standalone: true,
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  imports: [FormsModule, CommonModule, ListComponent],
})
export class BusComponent implements OnInit {
  buses: Bus[] = [];
  selectedBus: Bus | null = null;
  errorMessage: string = '';

  // Define columns for the ListComponent
  listColumns: ListColumn[] = [
    { field: 'placa', header: 'Placa' },
    { field: 'modelo', header: 'Modelo' },
    // { field: 'asignarBus', header: 'Asignar Bus' }, // Special field for assign bus button
  ];

  constructor(
    public busService: BusService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getBuses();
  }

  getBuses(): void {
    this.busService.getBuses().subscribe({
      next: (data: Bus[]) => {
        this.buses = data;
      },
      error: (error) => {
        console.error('Error fetching buses:', error);
        this.errorMessage = 'Failed to load buses.';
      },
    });
  }

  // Handle edit event
  onEdit(bus: Bus): void {
    // Navigate to the edit bus route, assuming you have one
    this.router.navigate(['/editar-bus', bus.id]);
  }

  // Handle delete event
  onDelete(bus: Bus): void {
    if (!bus.id) {
      this.errorMessage = 'Bus ID is missing.';
      return;
    }
    if (!confirm(`Are you sure you want to delete bus ${bus.placa}?`)) {
      return;
    }
    this.busService.deleteBus(bus.id).subscribe({
      next: () => {
        this.getBuses();
        this.selectedBus = null;
        this.errorMessage = '';
        alert('Bus deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting bus:', error);
        this.errorMessage = error.message || 'Failed to delete bus.';
        alert(this.errorMessage);
      },
    });
  }

  // Handle assign bus event
  onAssignBus(bus: Bus): void {
    // Navigate to the assign bus component/page, passing the bus ID
    this.router.navigate(['/asignar-bus', bus.id]);
  }

  // Create Bus method remains unchanged
  createBus(placa: string, modelo: string): void {
    if (!placa || !modelo) {
      this.errorMessage = 'Placa and Modelo are required.';
      return;
    }
    const newBus: Bus = { placa, modelo };
    this.busService.createBus(newBus).subscribe({
      next: () => {
        this.getBuses();
        this.selectedBus = null;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error creating bus:', error);
        this.errorMessage = 'Failed to create bus.';
      },
    });
  }

  // Update Bus method remains unchanged
  updateBus(bus: Bus): void {
    if (!bus.id) {
      this.errorMessage = 'Bus ID is missing.';
      return;
    }
    this.busService.updateBus(bus).subscribe({
      next: () => {
        this.getBuses();
        this.selectedBus = null;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error updating bus:', error);
        this.errorMessage = 'Failed to update bus.';
      },
    });
  }
}
