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
  expandedItems: Set<string> = new Set();
  
  constructor(private navigationService: NavigationService, private router: Router) {
    this.menuItems = this.navigationService.getNavigationItems();
  }

  ngOnInit() {
    this.checkActiveRoutes();
    this.router.events.subscribe(() => {
      this.checkActiveRoutes();
    });
  }

  private checkActiveRoutes() {
    const currentUrl = this.router.url;
    this.menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          currentUrl.includes(child.route || '')
        );
        if (hasActiveChild) {
          item.expanded = true;
          this.expandedItems.add(item.title);
        }
      }
    });
  }
  
  toggleSubMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
    if (item.expanded) {
      this.expandedItems.add(item.title);
    } else {
      this.expandedItems.delete(item.title);
    }
  }

  isMenuActive(item: MenuItem): boolean {
    if (!item.children) return false;
    const currentUrl = this.router.url;
    return item.children.some(child => currentUrl.includes(child.route || ''));
  }
}