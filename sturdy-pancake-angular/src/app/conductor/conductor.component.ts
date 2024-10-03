import { Component, OnInit } from '@angular/core';
import { ConductorService } from './conductor.service';
import { Conductor } from './conductor.model';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css'],
})
export class ConductorComponent implements OnInit {
  conductores: Conductor[] = [];
  selectedConductor: Conductor | null = null;

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

  createConductor(conductor: Conductor): void {
    this.conductorService.createConductor(conductor).subscribe(() => {
      this.getConductores();
    });
  }

  updateConductor(conductor: Conductor): void {
    if (conductor.id) {
      this.conductorService.updateConductor(conductor).subscribe(() => {
        this.getConductores();
      });
    }
  }

  deleteConductor(id: number): void {
    this.conductorService.deleteConductor(id).subscribe(() => {
      this.getConductores();
    });
  }
}