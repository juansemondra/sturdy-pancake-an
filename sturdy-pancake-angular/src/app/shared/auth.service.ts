import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginDto } from '../dto/login-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtAuthenticationResponse } from '../dto/jwt-authentication-response';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

const JWT_TOKEN = 'jwt-token';
const EMAIL = 'user-email';
const ROLE = 'user-role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  login(loginDto: LoginDto): Observable<JwtAuthenticationResponse> {
    return this.http
      .post<JwtAuthenticationResponse>(
        `${environment.serverUrl}/auth/login`,
        loginDto
      )
      .pipe(
        map((jwt) => {
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem(JWT_TOKEN, jwt.token);
            sessionStorage.setItem(EMAIL, jwt.email);
            sessionStorage.setItem(ROLE, jwt.role);
          }
          return jwt;
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(JWT_TOKEN);
      sessionStorage.removeItem(EMAIL);
      sessionStorage.removeItem(ROLE);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(JWT_TOKEN) != null;
    }
    return false;
  }

  token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(JWT_TOKEN);
    }
    return null;
  }

  role(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(ROLE);
    }
    return null;
  }
}
