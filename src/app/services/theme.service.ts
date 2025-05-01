import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkSubject = new BehaviorSubject<boolean>(this.getStoredTheme());
  isDarkMode$ = this.isDarkSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private getStoredTheme(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }

  private initTheme(): void {
    this.applyTheme(this.getStoredTheme());
  }

  toggleTheme(): void {
    const isDark = !this.isDarkSubject.value;
    localStorage.setItem('darkMode', isDark.toString());
    this.isDarkSubject.next(isDark);
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('dark-theme', isDark);
  }
}
