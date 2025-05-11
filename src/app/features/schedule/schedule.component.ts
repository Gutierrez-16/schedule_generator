import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DayOfWeek, Course } from './interfaces/schedule.interface';
import { ExportButtonsComponent } from './components/export-buttons/export-buttons.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ExportButtonsComponent,
  ],
})
export class ScheduleComponent implements OnInit {
  timeSlots: string[] = this.generateTimeSlots();
  days: DayOfWeek[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  courses: Course[] = [];

  ngOnInit() {
    this.courses = [
      {
        courseId: '101',
        course: 'Matemáticas',
        credits: 4,
        details: [
          {
            teacher: 'Dr. García',
            classTypes: [
              {
                assignmentDetailId: 1,
                classroom: 'A101',
                classType: 'TEORIA',
                day: 'Lunes',
                startTime: '07:00',
                endTime: '08:30',
              },
            ],
          },
        ],
      },
    ];
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    let hour = 7;
    let minutes = 0;

    while (hour <= 23 || (hour === 23 && minutes <= 15)) {
      slots.push(
        `${hour.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`
      );
      minutes += 45;
      if (minutes >= 60) {
        hour += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }
    return slots;
  }

  getClass(day: string, time: string): CourseWithUI | null {
    const course = this.courses.find((course) =>
      course.details.some((detail) =>
        detail.classTypes.some(
          (ct) => ct.day === day && ct.startTime <= time && ct.endTime > time
        )
      )
    );

    if (!course) return null;

    const detail = course.details.find((d) =>
      d.classTypes.some(
        (ct) => ct.day === day && ct.startTime <= time && ct.endTime > time
      )
    );

    if (!detail) return null;

    const classType = detail.classTypes.find(
      (ct) => ct.day === day && ct.startTime <= time && ct.endTime > time
    );

    if (!classType) return null;

    return {
      ...course,
      color: '#4fc3f7',
      subject: course.course,
      professor: detail.teacher,
      classroom: classType.classroom,
      startTime: classType.startTime,
      endTime: classType.endTime,
    };
  }

  shouldShowCell(day: string, time: string): boolean {
    const course = this.getClass(day, time);
    if (!course) return true;

    const detail = course.details.find((d) =>
      d.classTypes.some((ct) => ct.day === day)
    );

    if (!detail) return true;

    return detail.classTypes.some((ct) => ct.startTime === time);
  }

  calculateClassSpan(course: CourseWithUI | null): number {
    if (!course) return 1;

    const detail = course.details[0];
    const classType = detail.classTypes[0];
    const startMinutes = this.timeToMinutes(classType.startTime);
    const endMinutes = this.timeToMinutes(classType.endTime);
    return Math.ceil((endMinutes - startMinutes) / 45);
  }

  formatTimeRange(startTime: string, endTime: string): string {
    return `${startTime} - ${endTime}`;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}

interface CourseWithUI extends Course {
  color: string;
  subject: string;
  professor: string;
  classroom: string;
  startTime: string;
  endTime: string;
}
