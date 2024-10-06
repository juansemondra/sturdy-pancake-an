import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BusService } from './bus.service';
import { Bus } from './bus.model';

@Component({
  selector: 'app-bus',
  standalone: true,
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
  imports: [FormsModule, CommonModule]
})
export class BusComponent implements OnInit {
  buses: Bus[] = [];
  selectedBus: Bus | null = null;

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.getBuses();
  }

  getBuses(): void {
    this.busService.getBuses().subscribe((data: Bus[]) => {
      this.buses = data;
    });
  }

  onSelect(bus: Bus): void {
    this.selectedBus = bus;
  }

  createBus(placa: string, modelo: string): void {
    if (!placa || !modelo) {
      return; 
    }
    const newBus: Bus = { placa, modelo }; 
    this.busService.createBus(newBus).subscribe(() => {
      this.getBuses();
      this.selectedBus = null;
    });
  }

  updateBus(bus: Bus): void {
    if (bus.id) {
      this.busService.updateBus(bus).subscribe(() => {
        this.getBuses();
        this.selectedBus = null;
      });
    }
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(() => {
      this.getBuses();
      this.selectedBus = null;
    });
  }
}