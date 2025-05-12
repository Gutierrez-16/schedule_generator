import {
  Component,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AssignmentsService } from '../../core/services/assignments.service';
import {
  Career,
  Course,
  CourseDetail,
  Cycle,
} from '@app/core/interfaces/schedule.interface';

@Component({
  selector: 'app-cycles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    FormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css'],
})
export class CyclesComponent implements OnInit {
  @ViewChild('courseDetailsDialog') courseDetailsDialog!: TemplateRef<any>;

  cycles: Cycle[] = [];
  selectedCourses: Set<string> = new Set();
  careerData!: Career;
  Array = Array;
  loading = true;
  error: string | null = null;
  readonly defaultCareerId = 9;

  constructor(private assignmentsService: AssignmentsService) {}

  @Output() selectedCoursesChange = new EventEmitter<Course[]>();

  ngOnInit() {
    this.loadCareerData();
  }

  loadCareerData() {
    this.loading = true;
    this.error = null;

    this.assignmentsService
      .getAssignmentsByCareer(this.defaultCareerId)
      .subscribe({
        next: (data) => {
          this.careerData = data;
          this.cycles = data.cycles;
          this.loading = false;
          console.log(`Carrera cargada: ${this.careerData.career}`);
          console.log(`Total de ciclos: ${this.cycles.length}`);
        },
        error: (err) => {
          this.error =
            'No se pudieron cargar los cursos. Por favor, intente más tarde.';
          this.loading = false;
          console.error('Error cargando cursos:', err);
        },
      });
  }

  toggleCourseSelection(course: Course): void {
    if (this.selectedCourses.has(course.courseId)) {
      this.selectedCourses.delete(course.courseId);
    } else {
      this.selectedCourses.add(course.courseId);
    }

    const selectedCoursesList = this.cycles
      .flatMap((cycle) => cycle.courses)
      .filter((course) => this.selectedCourses.has(course.courseId));

    this.selectedCoursesChange.emit(selectedCoursesList);
  }

  handleCourseRemoval(courseId: string): void {
    this.selectedCourses.delete(courseId);
    const selectedCoursesList = this.cycles
      .flatMap((cycle) => cycle.courses)
      .filter((course) => this.selectedCourses.has(course.courseId));

    this.selectedCoursesChange.emit(selectedCoursesList);
  }

  searchText: string = '';
  selectedIndex = 0;

  nextCycle() {
    if (this.selectedIndex < this.cycles.length - 1) {
      this.selectedIndex++;
    }
  }

  previousCycle() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  filterCourses(cycle: Cycle) {
    if (!this.searchText) return cycle.courses;
    const search = this.searchText.toLowerCase();
    return cycle.courses.filter(
      (course) =>
        course.course.toLowerCase().includes(search) ||
        course.details.some(
          (detail: CourseDetail) =>
            detail.teacher.toLowerCase().includes(search) ||
            detail.classTypes.some((ct) =>
              ct.classroom.toLowerCase().includes(search)
            )
        )
    );
  }
}
