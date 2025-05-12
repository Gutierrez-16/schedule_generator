import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Course, DayOfWeek } from '@app/core/interfaces/schedule.interface';
import { ScheduleInfo } from '@app/core/interfaces/schedule-info.interface';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: 'schedule.component.html',
  styleUrls: ['schedule.component.css'],
})
export class ScheduleComponent {
  @Input() allCourses: Course[] = [];

  private courseColors: Map<string, string> = new Map();
  private pastelColors = [
    '#ffadad', // Rosa suave
    '#ffd6a5', // Melocotón
    '#fdffb6', // Amarillo
    '#caffbf', // Verde menta
    '#9bf6ff', // Azul cielo
    '#a0c4ff', // Azul pastel
    '#bdb2ff', // Púrpura suave
    '#ffc6ff', // Lavanda
    '#ffe5d9', // Durazno
    '#b4f8c8', // Verde claro
    '#afcbff', // Azul pálido
    '#ffcfd2', // Rosa pálido
  ];

  days: DayOfWeek[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  timeSlots: string[] = this.generateTimeSlots();

  getClassInfo(day: string, time: string): ScheduleInfo | null {
    for (const course of this.allCourses) {
      for (const detail of course.details) {
        for (const type of detail.classTypes) {
          if (
            type.day === day &&
            this.isTimeInRange(time, type.startTime, type.endTime)
          ) {
            if (!this.courseColors.has(course.course)) {
              const randomColor =
                this.pastelColors[
                  Math.floor(Math.random() * this.pastelColors.length)
                ] + '80';
              this.courseColors.set(course.course, randomColor);
            }

            return {
              course: course.course,
              classType: type.classType,
              backgroundColor: this.courseColors.get(course.course)!,
              teacher: detail.teacher,
              classroom: type.classroom,
              startTime: type.startTime,
              endTime: type.endTime,
              value: type.value,
              message: type.message,
            };
          }
        }
      }
    }
    return null;
  }

  getClassSpan(day: string, time: string): number {
    const info = this.getClassInfo(day, time);
    if (!info) return 1;

    const startMinutes = this.timeToMinutes(info.startTime);
    const endMinutes = this.timeToMinutes(info.endTime);
    return Math.ceil((endMinutes - startMinutes) / 45);
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private isTimeInRange(
    slotTime: string,
    startTime: string,
    endTime: string
  ): boolean {
    const slot = this.timeToMinutes(slotTime);
    const start = this.timeToMinutes(startTime.slice(0, 5));
    const end = this.timeToMinutes(endTime.slice(0, 5));
    return slot >= start && slot < end;
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    let hour = 7;
    let minutes = 0;
    while (hour < 23) {
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

  isValidClass(day: string, time: string): boolean {
    const info = this.getClassInfo(day, time);
    return info ? info.value : true;
  }
}
