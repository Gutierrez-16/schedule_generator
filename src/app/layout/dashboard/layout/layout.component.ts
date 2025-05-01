// src/app/shared/layout/layout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  sidebarCollapsed = false;
  isMobile = false;
  isHandset$: Observable<boolean>;

  companyData = {
    name: 'Massachusetts Institute of Technology',
    logoUrl: 'https://logolook.net/wp-content/uploads/2021/08/MIT-Emblem.png',
    legalName: 'Sistema de Gestión de Horarios'
  };

  userMenuData = {
    photoUrl: 'http://res.cloudinary.com/dghwojbpc/image/upload/v1745033128/employee/ylvqrsb3oev7fimio5u4.jpg',
    username: 'Admin User',
    email: 'admin@example.com',
    menuItems: [
      {
        icon: 'person',
        label: 'Mi Perfil',
        route: '/dashboard/profile'
      },
      {
        icon: 'settings',
        label: 'Configuración',
        route: '/dashboard/settings'
      },
      {
        icon: 'logout',
        label: 'Cerrar Sesión',
        action: () => this.handleLogout()
      }
    ]
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    this.isHandset$.subscribe(isHandset => {
      this.isMobile = isHandset;
      this.sidebarCollapsed = isHandset;
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter(() => this.isMobile)
    ).subscribe(() => {
      this.sidebarCollapsed = true;
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  handleContentClick(event: MouseEvent): void {
    if (this.isMobile && !this.sidebarCollapsed) {
      const target = event.target as HTMLElement;
      if (!target.closest('.sidebar')) {
        this.sidebarCollapsed = true;
      }
    }
  }

  handleLogout(): void {
    this.authService.logout();
  }
}