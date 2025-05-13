import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreferencesModalComponent } from '../schedule/components/preferences-modal/preferences-modal.component';
import { Router } from '@angular/router';
import {
  Course,
  GenerateSchedulesRequest,
  PreferencesRequest,
} from '@app/core/interfaces/schedule.interface';
import { SchedulesService } from 'src/app/core/services/schedules.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthService],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  private uniqueCoursesMap = new Map<string, Course>();
  selectedCourses: Course[] = [];
  maxCredits: number;
  totalCredits = 0;
  private originalRequest: any;
  isLoading = false;

  constructor(
    private snackBar: MatSnackBar,
    private schedulesService: SchedulesService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
    const currentUser = this.authService.getCurrentUser();
    this.maxCredits = currentUser?.credits || 21;
  }

  @Output() courseRemoved = new EventEmitter<string>();

  userId = 1;

  ngOnInit() {
    const state = history.state;
    if (state?.regenerating && state?.courses) {
      this.updateSelectedCourses(state.courses);
      this.originalRequest = state.originalRequest;
    }
  }

  updateSelectedCourses(courses: Course[]) {
    this.uniqueCoursesMap.clear();

    courses.forEach((course) => {
      if (!this.uniqueCoursesMap.has(course.courseId)) {
        this.uniqueCoursesMap.set(course.courseId, course);
      }
    });

    this.selectedCourses = Array.from(this.uniqueCoursesMap.values());

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
    this.courseRemoved.emit(course.courseId);
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

    if (this.originalRequest) {
      const request = {
        ...this.originalRequest,
        courseIds: this.selectedCourses.map((course) =>
          Number(course.courseId)
        ),
      };

      this.generateSchedule(request);
      return;
    }

    const dialogRef = this.dialog.open(PreferencesModalComponent);
    dialogRef.afterClosed().subscribe((preferences) => {
      if (preferences) {
        const currentUser = this.authService.getCurrentUser();
        const request: GenerateSchedulesRequest = {
          careerId: currentUser?.career || 0, // Usar carrera del usuario
          preferences: {
            avoidDays: [],
            avoidStartHour: '07:00',
            preferredTeachers: [],
            preferredModalities: [],
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
        this.generateSchedule(request);
      }
    });
  }

  private generateSchedule(request: GenerateSchedulesRequest) {
    this.isLoading = true;
    this.schedulesService.generateSchedules(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.schedulesService.setScheduleData(response.data);
          this.router.navigate(['/schedule-manager'], {
            state: {
              scheduleData: response.data,
              originalRequest: request,
            },
          });
          this.snackBar.open('¡Horario generado exitosamente! 🎉', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
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
}
