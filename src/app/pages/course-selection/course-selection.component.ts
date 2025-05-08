import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyclesComponent } from '../../features/cycles/cycles.component';
import { CourseDetailsComponent } from '../../features/course-details/course-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { Course } from 'features/schedule/interfaces/schedule.interface';

@Component({
  selector: 'app-course-selection',
  standalone: true,
  imports: [
    CommonModule,
    CyclesComponent,
    CourseDetailsComponent,
    MatDividerModule
  ],
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent {
  @ViewChild('cyclesComponent') cyclesComponent!: CyclesComponent;
  @ViewChild(CourseDetailsComponent) courseDetails!: CourseDetailsComponent;

  onSelectedCoursesChange(courses: Course[]) {
    this.courseDetails.updateSelectedCourses(courses);
  }

  onCourseRemoved(courseId: number) {
    this.cyclesComponent.handleCourseRemoval(courseId);
  }
}
