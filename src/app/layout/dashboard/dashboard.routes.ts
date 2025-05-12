import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../../pages/home/dashboard-home/dashboard-home.component'
          ).then((m) => m.DashboardHomeComponent),
      },
      {
        path: 'course-selection',
        loadComponent: () =>
          import(
            '../../pages/course-selection/course-selection.component'
          ).then((m) => m.CourseSelectionComponent),
      },
      {
        path: 'schedule-manager',
        loadComponent: () =>
          import(
            '../../pages/schedule-manager/schedule-manager.component'
          ).then((m) => m.ScheduleManagerComponent),
      },
    ],
  },
];
