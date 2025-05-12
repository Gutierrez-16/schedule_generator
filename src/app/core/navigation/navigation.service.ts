import { Injectable } from '@angular/core';
import { MenuItem } from '@shared/interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationItems: MenuItem[] = [
    {
      title: 'Inicio',
      icon: 'home',
      route: '/',
    },
    {
      title: 'Seleccionar Cursos',
      icon: 'library_books',
      route: '/course-selection',
    },
    {
      title: 'Mis Horarios',
      icon: 'schedule',
      route: '/schedule-manager',
    },
  ];

  getNavigationItems(): MenuItem[] {
    return this.navigationItems;
  }
}
