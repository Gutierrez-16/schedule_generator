import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'features/schedule/interfaces/schedule.interface';
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
    MatChipsModule
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  private snackBar = inject(MatSnackBar);
  private schedulesService = inject(SchedulesService);

  @Output() courseRemoved = new EventEmitter<number>();

  maxCredits = 21;
  selectedCourses: Course[] = [];
  totalCredits = 0;

  // ID de usuario estático por ahora (puede venir de AuthService en el futuro)
  userId = 1;

  updateSelectedCourses(courses: Course[]) {
    this.selectedCourses = courses;
    this.totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  }

  canAddCourse(course: Course): boolean {
    return this.totalCredits + course.credits <= this.maxCredits;
  }

  removeCourse(course: Course) {
    this.selectedCourses = this.selectedCourses.filter(c => c.courseId !== course.courseId);
    this.totalCredits = this.selectedCourses.reduce((sum, c) => sum + c.credits, 0);
    this.courseRemoved.emit(course.courseId);
  }

  enrollCourses() {
    if (this.totalCredits > this.maxCredits) {
      this.snackBar.open('Excediste el límite de créditos permitidos', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

const request: ScheduleRequest = {
  userId: this.userId,
  courseIds: this.selectedCourses.map(course => course.courseId)
};


console.log('Enviando solicitud de horario:', request);

    this.schedulesService.saveSchedule(request).subscribe({

      next: () => {
        this.snackBar.open('Cursos agregados correctamente', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.error('Error al guardar horario:', err);
        this.snackBar.open('Error al guardar los cursos', 'OK', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
