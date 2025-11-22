import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    return true;  // User is authenticated, allow access
  } else {
    // User is not authenticated, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
