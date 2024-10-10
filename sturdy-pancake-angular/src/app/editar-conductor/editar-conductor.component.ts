import { Component, OnInit } from '@angular/core';
import { Conductor } from '../conductor/conductor.model';
import { ConductorService } from '../conductor/conductor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-conductor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-conductor.component.html',
  styleUrl: './editar-conductor.component.css',
})
export class EditarConductorComponent implements OnInit {
  conductor: Conductor = {
    nombre: '',
    telefono: 0,
    direccion: '',
  };

  constructor(
    private conductorService: ConductorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.conductorService.getConductor(+id).subscribe((data) => {
        this.conductor = data;
      });
    }
  }

  onSubmit(): void {
    if (this.conductor.id) {
      this.conductorService.updateConductor(this.conductor).subscribe(() => {
        this.router.navigate(['/conductores']);
      });
    }
  }
}
