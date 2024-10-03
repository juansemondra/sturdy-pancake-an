import { Component, OnInit } from '@angular/core';
import { BusService } from './bus.service';
import { Bus } from './bus.model';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css'],
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

  createBus(bus: Bus): void {
    this.busService.createBus(bus).subscribe(() => {
      this.getBuses();
    });
  }

  updateBus(bus: Bus): void {
    if (bus.id) {
      this.busService.updateBus(bus).subscribe(() => {
        this.getBuses();
      });
    }
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(() => {
      this.getBuses();
    });
  }
}