import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NavbarComponent], // Solo importa el RouterModule
})
export class AppComponent {
  title = 'Gestión de Buses';
}
