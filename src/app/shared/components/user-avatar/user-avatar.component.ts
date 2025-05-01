import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent {
  @Input() imageUrl?: string;
  @Input() username!: string;
  @Input() size: number = 40;

  private colors = [
    '#1976D2', '#D32F2F', '#388E3C', '#7B1FA2', 
    '#C2185B', '#0097A7', '#FFA000', '#5D4037'
  ];

  get styles() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      backgroundColor: this.backgroundColor,
      fontSize: `${this.size * 0.4}px`
    };
  }

  get initial(): string {
    return this.username ? this.username.charAt(0) : '?';
  }

  get backgroundColor(): string {
    if (this.imageUrl) return 'transparent';
    const index = this.username
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return this.colors[index % this.colors.length];
  }
}
