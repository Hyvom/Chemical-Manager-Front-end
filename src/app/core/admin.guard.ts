import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();

  if (role === 'admin') {
    return true;
  } else {
    // Non-admin users get redirected to home
    router.navigate(['/home']);
    return false;
  }
};
