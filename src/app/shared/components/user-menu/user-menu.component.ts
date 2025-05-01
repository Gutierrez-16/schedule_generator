import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { UserMenuData } from '@shared/interfaces/user-menu.interface';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    UserAvatarComponent
  ],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-menu-trigger">
      <app-user-avatar 
        [imageUrl]="data.photoUrl"
        [username]="data.username"
        [size]="40">
      </app-user-avatar>
    </button>

    <mat-menu #userMenu="matMenu" class="user-menu-panel">
      <div class="menu-header">
        <app-user-avatar 
          [imageUrl]="data.photoUrl"
          [username]="data.username"
          [size]="48">
        </app-user-avatar>
        <div class="header-info">
          <span class="header-name">{{ data.username }}</span>
          <span class="header-email">{{ data.email }}</span>
        </div>
      </div>
      
      <mat-divider></mat-divider>
      
      <ng-container *ngFor="let item of data.menuItems">
        <button mat-menu-item 
                [routerLink]="item.route" 
                (click)="item.action && item.action()">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
        </button>
      </ng-container>
    </mat-menu>
  `,
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
  @Input() data!: UserMenuData;
}
