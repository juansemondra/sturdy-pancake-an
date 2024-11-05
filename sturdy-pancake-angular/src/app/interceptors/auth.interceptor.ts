import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log(
      'Authorization header added:',
      clonedRequest.headers.get('Authorization')
    );
    return next(clonedRequest);
  } else {
    console.log('No JWT token found, proceeding without Authorization header.');
    return next(req);
  }
};
