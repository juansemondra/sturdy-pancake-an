import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  activeLink: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
