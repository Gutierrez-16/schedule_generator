import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // Comentado temporalmente para permitir acceso directo al dashboard
  // if (authService.isAuthenticated()) {
  //   return true;
  // }
  // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  // return false;
  
  return true; // Permitir acceso temporal
};