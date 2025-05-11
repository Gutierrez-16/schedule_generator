import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyclesComponent } from '@app/features/cycles/cycles.component';
import { CourseDetailsComponent } from '@app/features/course-details/course-details.component';
import { Course } from '@app/features/schedule/interfaces/schedule.interface';

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

  onSelectedCoursesChange(courses: Course[]) {
    this.courseDetails.updateSelectedCourses(courses);
  }

  onCourseRemoved(courseId: string) {
    this.cyclesComponent.handleCourseRemoval(courseId);
  }
}
