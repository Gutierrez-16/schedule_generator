import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { ExportButtonsComponent } from '@app/features/schedule/components/export-buttons/export-buttons.component';
import { Course } from '@app/core/interfaces/schedule.interface';
import { ScheduleComponent } from '../../features/schedule/schedule.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchedulesService } from '@app/core/services/schedules.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-schedule-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    ExportButtonsComponent,
    ScheduleComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.css'],
})
export class ScheduleManagerComponent implements OnInit {
  allCourses: Course[] = [];
  private originalScheduleRequest: any;
  isLoading = false;

  constructor(
    private router: Router,
    private schedulesService: SchedulesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const data = history.state?.scheduleData;
    if (data) {
      this.allCourses = data.cycles.flatMap(
        (cycle: { courses: Course[] }) => cycle.courses
      );
      this.originalScheduleRequest = history.state?.originalRequest;
    } else {
      // Redirigir si no hay cursos
      this.router.navigate(['/course-selection']);
      this.snackBar.open('Primero debes seleccionar cursos', 'OK', {
        duration: 3000,
      });
    }
  }

  regenerateSchedule() {
    if (!this.allCourses.length) {
      this.router.navigate(['/course-selection']);
      return;
    }

    this.isLoading = true;
    this.schedulesService
      .generateSchedules(this.originalScheduleRequest)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.schedulesService.setScheduleData(response.data);
            this.allCourses = response.data.cycles.flatMap(
              (cycle: { courses: Course[] }) => cycle.courses
            );
            this.snackBar.open('¡Nuevo horario generado! 🎉', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('Error al generar nuevo horario', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }
}
