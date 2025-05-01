import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  currentDate = new Date();

  mainStats = [
    { label: 'Usuarios', value: '128', icon: 'people' },
    { label: 'Profesores', value: '42', icon: 'school' },
    { label: 'Estudiantes', value: '830', icon: 'person' },
    { label: 'Cursos', value: '34', icon: 'menu_book' }
  ];

  users = [
    { name: 'Carlos Díaz', role: 'Estudiante', date: '29 Abr' },
    { name: 'María López', role: 'Docente', date: '28 Abr' },
    { name: 'Ana Torres', role: 'Admin', date: '27 Abr' }
  ];

  weekActivity = [
    { label: 'L', value: 70 },
    { label: 'M', value: 45 },
    { label: 'X', value: 85 },
    { label: 'J', value: 60 },
    { label: 'V', value: 75 },
    { label: 'S', value: 40 },
    { label: 'D', value: 30 }
  ];

  columns = ['avatar', 'name', 'role', 'date'];
}