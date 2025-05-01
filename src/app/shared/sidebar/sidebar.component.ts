// src/app/shared/sidebar/sidebar.component.ts
import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuItem } from '@shared/interfaces/menu-item.interface';
import { NavigationService } from '../../core/navigation/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatExpansionModule, RouterModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() @HostBinding('class.collapsed') isCollapsed = false;
  menuItems: MenuItem[] = [];
  
  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.menuItems = this.navigationService.getNavigationItems();
  }
  
  toggleSubMenu(item: MenuItem): void {
    // Solo toggle el submenu actual sin cerrar los otros
    item.expanded = !item.expanded;
  }

  isMenuActive(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => 
      this.router.isActive(child.route || '', true));
  }
}