import { Routes } from '@angular/router';
import { BusComponent } from './bus/bus.component';
import { ConductorComponent } from './conductor/conductor.component';
import { RutaComponent } from './ruta/ruta.component';

export const routes: Routes = [
  { path: '', redirectTo: '/buses', pathMatch: 'full' },
  { path: 'buses', component: BusComponent },
  { path: 'conductores', component: ConductorComponent },
  { path: 'rutas', component: RutaComponent }
];