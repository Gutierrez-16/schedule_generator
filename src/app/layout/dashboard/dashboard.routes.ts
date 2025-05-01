import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../../pages/home/dashboard-home/dashboard-home.component')
          .then(m => m.DashboardHomeComponent)
      }
    ]
  }
];