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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    this.errorMessage = ''; // Clear any previous error
    this.auth.login(this.loginDto).subscribe({
      next: (jwt) => {
        console.log(jwt);
        this.router.navigate(['cuenta']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = `Error en el inicio de sesión: ${err.message}`;
      },
    });
  }
}
