import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyclesComponent } from '@app/features/cycles/cycles.component';
import { CourseDetailsComponent } from '@app/features/course-details/course-details.component';
import { Course } from '@app/core/interfaces/schedule.interface';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-course-selection',
  standalone: true,
  imports: [CommonModule, CyclesComponent, CourseDetailsComponent],
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css'],
})
export class CourseSelectionComponent {
  @ViewChild('cyclesComponent') cyclesComponent!: CyclesComponent;
  @ViewChild(CourseDetailsComponent) courseDetails!: CourseDetailsComponent;

  careerName: string = '';

  constructor(private authService: AuthService) {
    const currentUser = this.authService.getCurrentUser();
    const careerMap: { [key: number]: string } = {
      1: 'Ingeniería de Sistemas',
      2: 'Ingeniería Civil',
      3: 'Ingeniería Industrial',
      4: 'Arquitectura',
      5: 'Medicina',
      6: 'Derecho',
      7: 'Psicología',
      8: 'Administración',
      9: 'Contabilidad',
    };

    this.careerName =
      careerMap[currentUser?.career || 0] || 'Carrera no especificada';
  }

  onSelectedCoursesChange(courses: Course[]) {
    this.courseDetails.updateSelectedCourses(courses);
  }

  onCourseRemoved(courseId: string) {
    this.cyclesComponent.handleCourseRemoval(courseId);
  }
}
