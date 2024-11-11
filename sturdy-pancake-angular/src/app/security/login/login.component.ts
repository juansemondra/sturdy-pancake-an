import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../../dto/login-dto';
import { AuthService } from '../../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginDto: LoginDto = new LoginDto('', '');
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin(loginDto: LoginDto) {
    this.authService.login(loginDto).subscribe({
      next: (response) => {
        const initialRoute = this.authService.getInitialRoute();
        this.router.navigate([initialRoute]);
      },
      error: (error) => {
        // Handle error
        console.error('Login failed:', error);
      },
    });
  }
}
