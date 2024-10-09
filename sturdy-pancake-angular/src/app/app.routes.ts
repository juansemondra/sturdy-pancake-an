import { Routes } from '@angular/router';
import { ConductorComponent } from './conductor/conductor.component';
import { BusComponent } from './bus/bus.component';
import { RutaComponent } from './ruta/ruta.component';
import { EditarConductorComponent } from './editar-conductor/editar-conductor.component';
import { CrearConductorComponent } from './crear-conductor/crear-conductor.component';

export const routes: Routes = [
  { path: '', redirectTo: '/buses', pathMatch: 'full' },
  { path: 'buses', component: BusComponent },
  { path: 'conductores', component: ConductorComponent },
  { path: 'rutas', component: RutaComponent },
  { path: 'conductores/editar/:id', component: EditarConductorComponent },
];
