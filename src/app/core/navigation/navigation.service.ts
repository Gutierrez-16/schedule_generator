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
      route: '/dashboard'
    },
    {
      title: 'Gestión de Horarios',
      icon: 'schedule',
      children: [
        {
          title: 'Lista de Horarios',
          icon: 'view_list',
          route: '/dashboard/schedules/list'
        },
        {
          title: 'Nuevo Horario',
          icon: 'add_circle',
          route: '/dashboard/schedules/create'
        }
      ]
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
      route: '/dashboard/settings'
    }
  ];

  getNavigationItems(): MenuItem[] {
    return this.navigationItems;
  }
}
