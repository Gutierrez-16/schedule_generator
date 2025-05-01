import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('../../pages/auth/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('../../pages/auth/forgot-password/forgot-password.component')
          .then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('../../pages/auth/reset-password/reset-password.component')
          .then(m => m.ResetPasswordComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];