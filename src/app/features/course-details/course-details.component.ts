import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../cycles/interfaces/cycle.interface';

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
  @Output() courseRemoved = new EventEmitter<number>();
  maxCredits = 21;
  selectedCourses: Course[] = [];
  totalCredits = 0;

  updateSelectedCourses(courses: Course[]) {
    this.selectedCourses = courses;
    this.totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  }

  canAddCourse(course: Course): boolean {
    return this.totalCredits + course.credits <= this.maxCredits;
  }

  removeCourse(course: Course) {
    this.selectedCourses = this.selectedCourses.filter(c => c.id !== course.id);
    this.totalCredits = this.selectedCourses.reduce((sum, c) => sum + c.credits, 0);
    this.courseRemoved.emit(course.id);
  }

  enrollCourses() {
    if (this.totalCredits > this.maxCredits) {
      this.snackBar.open('Excediste el límite de créditos permitidos', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.snackBar.open('Cursos agregados correctamente', 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
