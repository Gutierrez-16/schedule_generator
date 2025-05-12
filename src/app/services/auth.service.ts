// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {
  LoginRequest,
  LoginResponse,
  User,
  UserPayload,
} from '../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    const token = this.getToken();
    if (token) {
      const user = this.decodeTokenAndGetUser(token);
      if (user) {
        this.currentUserSubject.next(user);
      }
    }
  }

  private decodeTokenAndGetUser(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as UserPayload;
      return {
        id: payload.id,
        email: payload.email,
        username: payload.sub,
        career: payload.career,
        credits: payload.credits,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${environment.authApiUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<LoginResponse>(url, credentials, { headers }).pipe(
      tap((response) => {
        if (response.success) {
          const token = response.data;
          localStorage.setItem('token', token);

          const user = this.decodeTokenAndGetUser(token);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log('Usuario decodificado:', user);
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  removeToken() {
    localStorage.removeItem('token'); // Asegúrate de que esta clave sea la correcta
  }
}
