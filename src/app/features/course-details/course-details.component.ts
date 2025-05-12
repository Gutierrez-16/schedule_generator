import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesModalComponent } from '../schedule/components/preferences-modal/preferences-modal.component';
import { Router } from '@angular/router';
import {
  Course,
  GenerateSchedulesRequest,
  PreferencesRequest,
} from '@app/core/interfaces/schedule.interface';
import { ScheduleRequest } from 'src/app/core/interfaces/ScheduleRequest';
import { SchedulesService } from 'src/app/core/services/schedules.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  private uniqueCoursesMap = new Map<string, Course>();
  selectedCourses: Course[] = [];
  maxCredits = 21;
  totalCredits = 0;

  constructor(
    private snackBar: MatSnackBar,
    private schedulesService: SchedulesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  @Output() courseRemoved = new EventEmitter<string>(); // Changed from number to string

  // ID de usuario estático por ahora (puede venir de AuthService en el futuro)
  userId = 1;

  updateSelectedCourses(courses: Course[]) {
    // Limpiar el mapa actual
    this.uniqueCoursesMap.clear();

    // Actualizar el mapa con los nuevos cursos, evitando duplicados
    courses.forEach((course) => {
      if (!this.uniqueCoursesMap.has(course.courseId)) {
        this.uniqueCoursesMap.set(course.courseId, course);
      }
    });

    // Convertir el mapa a array para selectedCourses
    this.selectedCourses = Array.from(this.uniqueCoursesMap.values());

    // Calcular créditos totales
    this.totalCredits = this.selectedCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );

    console.log('📚 Cursos actualizados:', this.selectedCourses);
    console.log('💯 Total créditos:', this.totalCredits);
  }

  canAddCourse(course: Course): boolean {
    return this.totalCredits + course.credits <= this.maxCredits;
  }

  removeCourse(course: Course) {
    this.uniqueCoursesMap.delete(course.courseId);
    this.selectedCourses = Array.from(this.uniqueCoursesMap.values());
    this.totalCredits = this.selectedCourses.reduce(
      (sum, c) => sum + c.credits,
      0
    );
    this.courseRemoved.emit(course.courseId); // courseId is now string
    console.log('🗑️ Curso removido:', course.courseId);
    console.log('📚 Cursos restantes:', this.selectedCourses);
  }

  enrollCourses() {
    if (this.totalCredits > this.maxCredits) {
      this.snackBar.open('Excediste el límite de créditos permitidos', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    const dialogRef = this.dialog.open(PreferencesModalComponent);

    dialogRef.afterClosed().subscribe((preferences) => {
      if (preferences) {
        console.log('Selected courses:', this.selectedCourses);

        const request: GenerateSchedulesRequest = {
          careerId: 9,
          preferences: {
            avoidDays: [],
            avoidStartHour: '07:00',
            preferredTeachers: [],
            preferredModalities: [], // Tipos de clase simplificados
            maxHoursPerDay: 8,
            minDaysPerWeek: 3,
            maxDaysPerWeek: 6,
            blockedHours: [],
            ...preferences,
          },
          courseIds: this.selectedCourses.map((course) =>
            Number(course.courseId)
          ),
        };

        console.log('Request to be sent:', JSON.stringify(request, null, 2));

        this.schedulesService.generateSchedules(request).subscribe({
          next: (response) => {
            console.log('✅ Success response:', response);
            if (response.success) {
              this.schedulesService.setScheduleData(response.data);
              this.router.navigate(['/schedule-manager'], {
                state: { scheduleData: response.data },
              });
            }
          },
          error: (err) => {
            console.error('❌ Error response:', err);
            let errorMessage = 'Error al generar el horario';

            if (err.error?.message) {
              errorMessage = `Error: ${err.error.message}`;
            }

            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
