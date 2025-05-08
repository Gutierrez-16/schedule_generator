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
    const dataFromService = [
      {
        name: 'Anatomía Humana I',
        credits: 6,
        details: [
          { day: 'Lunes', startTime: '08:00', endTime: '10:00' },
          { day: 'Miércoles', startTime: '07:00', endTime: '09:00' },
        ],
      },
      {
        name: 'Biología Celular y Molecular',
        credits: 5,
        details: [
          { day: 'Martes', startTime: '10:00', endTime: '12:00' },
          { day: 'Jueves', startTime: '10:00', endTime: '12:00' },
        ],
      },
      {
        name: 'Bioestadística',
        credits: 4,
        details: [
          { day: 'Martes', startTime: '14:00', endTime: '16:00' },
          { day: 'Jueves', startTime: '14:00', endTime: '16:00' },
        ],
      },
      {
        name: 'Bioquímica Médica',
        credits: 5,
        details: [
          { day: 'Viernes', startTime: '08:00', endTime: '10:00' },
          { day: 'Lunes', startTime: '14:00', endTime: '16:00' },
        ],
      },
    ];

    // Transformamos al tipo Course esperado por el componente
    this.courses = dataFromService.map((item, index) => ({
      assignmentId: index + 1,
      courseId: 100 + index + 1,
      course: item.name,
      credits: item.credits,
      details: item.details.map((detail) => ({
        ...detail,
        teacher: 'Por asignar', // Puedes reemplazar esto si tienes los nombres
        classroom: 'Aula por definir',
      })),
    }));
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
      course.details.some(
        (detail) =>
          detail.day === day &&
          detail.startTime <= time &&
          detail.endTime > time
      )
    );

    if (!course) return null;

    const detail = course.details.find(
      (d) => d.day === day && d.startTime <= time && d.endTime > time
    );

    if (!detail) return null;

    return {
      ...course,
      color: '#4fc3f7',
      subject: course.course,
      professor: detail.teacher,
      classroom: detail.classroom,
      startTime: detail.startTime,
      endTime: detail.endTime,
    };
  }

  shouldShowCell(day: string, time: string): boolean {
    const course = this.getClass(day, time);
    if (!course) return true;
    return course.details.some((d) => d.startTime === time);
  }

  calculateClassSpan(course: CourseWithUI | null): number {
    if (!course) return 1;
    const detail = course.details[0];
    const startMinutes = this.timeToMinutes(detail.startTime);
    const endMinutes = this.timeToMinutes(detail.endTime);
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
