import { Routes } from '@angular/router';
import { ConductorComponent } from './conductor/conductor.component';
import { BusComponent } from './bus/bus.component';
import { RutaComponent } from './ruta/ruta.component';
import { EditarConductorComponent } from './editar-conductor/editar-conductor.component';
import { CrearConductorComponent } from './crear-conductor/crear-conductor.component';
import { AsignarBusComponent } from './asignar-bus/asignar-bus.component';
import { EditarBusComponent } from './editar-bus/editar-bus.component';
import { CrearBusComponent } from './crear-bus/crear-bus.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'buses', component: BusComponent, canActivate: [AuthGuard] },
  {
    path: 'conductores',
    component: ConductorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'rutas', component: RutaComponent, canActivate: [AuthGuard] },
  {
    path: 'conductores/editar/:id',
    component: EditarConductorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conductores/crear',
    component: CrearConductorComponent,
    canActivate: [AuthGuard],
  },
  //asignar bus
  {
    path: 'conductores/asignar-bus/:id',
    component: AsignarBusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-bus/:id',
    component: EditarBusComponent,
    canActivate: [AuthGuard],
  },
  { path: 'crear-bus', component: CrearBusComponent, canActivate: [AuthGuard] },
  //login
  { path: 'login', component: LoginComponent },
];
