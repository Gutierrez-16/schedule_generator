import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../../features/schedule/schedule.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CourseSelectionComponent } from '../course-selection/course-selection.component';
import { Router } from '@angular/router';
import {
  ScheduleData,
  ScheduleOption,
} from '@app/features/schedule/interfaces/schedule-options.interface';
import { Course } from '@app/features/schedule/interfaces/schedule.interface';

@Component({
  selector: 'app-schedule-manager',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleComponent,
    MatDividerModule,
    MatTabsModule,
    MatIconModule,
    CourseSelectionComponent,
  ],
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.css'],
})
export class ScheduleManagerComponent implements OnInit {
  selectedTab = 0;
  scheduleOptions: ScheduleOption[] = [];
  currentOption = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('showSchedule')) {
      this.selectedTab = 0;
      localStorage.removeItem('showSchedule');
    }

    if (history.state?.scheduleData) {
      this.selectedTab = 0;
      const data = history.state.scheduleData;

      // Crear variaciones del horario
      this.scheduleOptions = Array(3)
        .fill(null)
        .map((_, index) => ({
          scheduleData: {
            career: data.career,
            cycles: [
              {
                cycle: data.cycles[0].cycle,
                courses:
                  index === 0
                    ? data.cycles[0].courses
                    : this.shuffleCourseSchedules(data.cycles[0].courses),
              },
            ],
          },
          optionNumber: index + 1,
        }));
    }
  }

  private createScheduleVariations(originalData: ScheduleData): ScheduleData[] {
    const variations: ScheduleData[] = [];

    // First variation is original
    variations.push(originalData);

    // Create 2 more variations
    for (let i = 0; i < 2; i++) {
      variations.push({
        career: originalData.career,
        cycles: originalData.cycles.map((cycle) => ({
          cycle: cycle.cycle,
          courses: this.shuffleCourseSchedules(cycle.courses),
        })),
      });
    }

    return variations;
  }

  private shuffleCourseSchedules(courses: Course[]): Course[] {
    return courses.map((course) => ({
      ...course,
      details: course.details.map((detail) => ({
        ...detail,
        classTypes: [...detail.classTypes].sort(() => Math.random() - 0.5),
      })),
    }));
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  regenerateSchedule() {
    this.selectedTab = 1; // Switch back to course selection
  }

  nextOption() {
    if (this.currentOption < this.scheduleOptions.length - 1) {
      this.currentOption++;
    }
  }

  previousOption() {
    if (this.currentOption > 0) {
      this.currentOption--;
    }
  }
}
