import { Injectable } from '@angular/core';
import { MenuItem } from '@shared/interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home',
      route: '/'
    },
    {
      title: 'Generación de Horarios',
      icon: 'schedule',
      route: '/schedule-manager'
    },
    {
      title: 'Gestión de Personal',
      icon: 'people',
      children: [
        {
          title: 'Profesores',
          icon: 'school',
          route: '/dashboard/users/teachers'
        },
        {
          title: 'Personal Administrativo',
          icon: 'badge',
          route: '/dashboard/users/staff'
        }
      ]
    },
    {
      title: 'Reportes',
      icon: 'assessment',
      route: '/dashboard/reports'
    },
    {
      title: 'Configuración',
      icon: 'settings',
      children: [
        {
          title: 'Institución',
          icon: 'domain',
          route: '/configuration'
        },
        {
          title: 'Usuarios',
          icon: 'people_outline',
          route: '/dashboard/configuration/users'
        }
      ]
        
    }
  ];

  getNavigationItems(): MenuItem[] {
    return this.navigationItems;
  }
}
