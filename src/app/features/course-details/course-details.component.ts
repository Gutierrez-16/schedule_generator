import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  constructor(
    private snackBar: MatSnackBar,
    private schedulesService: SchedulesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  @Output() courseRemoved = new EventEmitter<string>(); // Changed from number to string

  maxCredits = 21;
  selectedCourses: Course[] = [];
  totalCredits = 0;

  // ID de usuario estático por ahora (puede venir de AuthService en el futuro)
  userId = 1;

  updateSelectedCourses(courses: Course[]) {
    this.selectedCourses = courses;
    this.totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
  }

  canAddCourse(course: Course): boolean {
    return this.totalCredits + course.credits <= this.maxCredits;
  }

  removeCourse(course: Course) {
    this.selectedCourses = this.selectedCourses.filter(
      (c) => c.courseId !== course.courseId
    );
    this.totalCredits = this.selectedCourses.reduce(
      (sum, c) => sum + c.credits,
      0
    );
    this.courseRemoved.emit(course.courseId); // courseId is now string
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
        const request: GenerateSchedulesRequest = {
          careerId: 1,
          preferences: preferences,
          courseIds: this.selectedCourses.map((course) =>
            Number(course.courseId)
          ),
        };

        this.schedulesService.generateSchedules(request).subscribe({
          next: (response) => {
            if (response.success) {
              // Primero navegamos al schedule manager
              this.router.navigate(['/schedule-manager'], {
                state: { scheduleData: response.data },
              });

              // Después forzamos la visualización del horario
              setTimeout(() => {
                localStorage.setItem('showSchedule', 'true');
                window.location.reload();
              }, 100);
            }
          },
          error: (err) => {
            console.error('Error al generar horario:', err);
            this.snackBar.open('Error al generar el horario', 'OK', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
