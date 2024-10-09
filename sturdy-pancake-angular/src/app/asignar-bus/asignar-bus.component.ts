import { Component, OnInit } from '@angular/core';
import { Conductor } from '../conductor/conductor.model';
import { Bus } from '../bus/bus.model';
import { ConductorService } from '../conductor/conductor.service';
import { BusService } from '../bus/bus.service';
import { FormsModule } from '@angular/forms';
import { RelacionBusRutaConductor } from '../relacion-bus-ruta-conductor/relacion-bus-ruta-conductor.model';
import { RelacionBusRutaConductorService } from '../relacion-bus-ruta-conductor/relacion-bus-ruta-conductor.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface RelacionConBus extends RelacionBusRutaConductor {
  bus?: Bus;
}

@Component({
  selector: 'app-asignar-bus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './asignar-bus.component.html',
  styleUrls: ['./asignar-bus.component.css'],
})
export class AsignarBusComponent implements OnInit {
  conductores: Conductor[] = [];
  busesConductor: Bus[] = []; // Buses assigned to the selected conductor
  allBuses: Bus[] = []; // All buses for new assignments
  availableBuses: Bus[] = []; // Buses not yet assigned to the conductor
  selectedConductorId!: number;
  selectedBusId!: number;
  relacionesConductor: RelacionConBus[] = []; // Enhanced Relationships
  selectedConductor?: Conductor;
  daysOfWeek: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  isLoading: boolean = false; // To handle loading state

  constructor(
    private conductorService: ConductorService,
    private busService: BusService,
    private relacionService: RelacionBusRutaConductorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadConductores();
    this.loadAllBuses();

    // Load the conductor from the URL, if provided
    this.route.params.subscribe((params) => {
      const conductorId = params['id']; // Get conductor ID from URL
      if (conductorId) {
        this.selectedConductorId = +conductorId;
        this.loadConductorDetails(); // Automatically load conductor
      }
    });
  }

  loadConductores(): void {
    this.conductorService.getConductores().subscribe(
      (data) => {
        this.conductores = data;
      },
      (error) => {
        console.error('Error fetching conductores:', error);
      }
    );
  }

  // Load all buses available for new assignments
  loadAllBuses(): void {
    this.busService.getBuses().subscribe(
      (data) => {
        this.allBuses = data;
        this.filterAvailableBuses(); // Initialize available buses
      },
      (error) => {
        console.error('Error fetching buses:', error);
      }
    );
  }

  // Load buses assigned to the selected conductor
  loadConductorDetails(): void {
    if (!this.selectedConductorId) {
      return;
    }

    this.isLoading = true;

    this.conductorService.getConductor(this.selectedConductorId).subscribe(
      (conductor) => {
        this.selectedConductor = conductor;

        // Fetch all relationships for this conductor using 'relacionBusRutaConductorIds'
        const relacionIds = conductor.relacionBusRutaConductorIds || [];

        if (relacionIds.length === 0) {
          this.relacionesConductor = [];
          this.busesConductor = [];
          this.filterAvailableBuses();
          this.isLoading = false;
          return;
        }

        const relacionRequests = relacionIds.map((relacionId) =>
          this.relacionService.getRelacion(relacionId)
        );

        forkJoin(relacionRequests).subscribe(
          (relaciones) => {
            const busIds = relaciones.map((relacion) => relacion.busId);

            // Remove duplicate busIds to minimize HTTP requests
            const uniqueBusIds = Array.from(new Set(busIds));

            // Create an array of observables to fetch each bus
            const busRequests = uniqueBusIds.map((busId) =>
              this.busService.getBus(busId)
            );

            // Fetch all buses concurrently
            forkJoin(busRequests).subscribe(
              (buses) => {
                this.busesConductor = buses;

                // Attach the Bus object to each relationship
                this.relacionesConductor = relaciones.map((relacion) => {
                  const bus = buses.find((b) => b.id === relacion.busId);
                  if (!bus) {
                    console.warn(
                      `Bus with ID ${relacion.busId} not found for Relacion ID ${relacion.id}`
                    );
                  }
                  return { ...relacion, bus };
                });

                this.filterAvailableBuses();
                this.isLoading = false;
              },
              (error) => {
                console.error('Error fetching buses for relaciones:', error);
                this.isLoading = false;
              }
            );
          },
          (error) => {
            console.error('Error fetching relaciones for conductor:', error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Error fetching conductor:', error);
        this.isLoading = false;
      }
    );
  }

  // Filter buses that are not yet assigned to the conductor
  filterAvailableBuses(): void {
    this.availableBuses = this.allBuses.filter(
      (bus) =>
        !this.relacionesConductor.some((relacion) => relacion.busId === bus.id)
    );
  }

  toggleDaySelection(relacion: RelacionConBus, day: string): void {
    const days = relacion.fechaDisponible.split('');
    const dayIndex = days.indexOf(day);
    if (dayIndex >= 0) {
      days.splice(dayIndex, 1); // Remove day
    } else {
      days.push(day); // Add day
    }
    relacion.fechaDisponible = days.join('');
  }

  isDaySelected(fechaDisponible: string, day: string): boolean {
    return fechaDisponible.includes(day);
  }

  updateRelacion(relacion: RelacionConBus): void {
    this.relacionService.updateRelacion(relacion).subscribe(
      () => {
        alert('Days updated successfully!');
        this.loadConductorDetails(); // Refresh the list after updating
      },
      (error) => {
        console.error('Error updating relacion:', error);
        alert('Failed to update days.');
      }
    );
  }

  // Assign a new bus to the selected conductor
  assignBusToConductor(): void {
    if (!this.selectedBusId || !this.selectedConductorId) {
      alert('Please select both a conductor and a bus.');
      return;
    }

    const newRelacion: RelacionBusRutaConductor = {
      busId: this.selectedBusId,
      conductorId: this.selectedConductorId,
      rutaId: 1, // Default or dynamic rutaId (for now, it's hardcoded)
      fechaDisponible: 'LMXJVSD',
    };

    this.relacionService.createRelacion(newRelacion).subscribe(
      () => {
        alert('Bus assigned successfully!');
        this.loadConductorDetails(); // Refresh the list after adding
      },
      (error) => {
        console.error('Error assigning bus:', error);
        alert('Failed to assign bus.');
      }
    );
  }

  removeBus(relacion: RelacionConBus): void {
    if (!relacion.id) {
      console.error('Relacion ID is missing.');
      return;
    }

    this.relacionService.deleteRelacion(relacion.id).subscribe(
      () => {
        alert('Bus removed successfully!');
        this.loadConductorDetails(); // Refresh after removal
      },
      (error) => {
        console.error('Error removing bus:', error);
        alert('Failed to remove bus.');
      }
    );
  }
}
