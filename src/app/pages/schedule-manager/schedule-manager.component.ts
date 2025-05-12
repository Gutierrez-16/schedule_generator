import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExportButtonsComponent } from '@app/features/schedule/components/export-buttons/export-buttons.component';
import {
  DayOfWeek,
  Course,
} from '@app/features/schedule/interfaces/schedule.interface';

interface ScheduleInfo {
  course: string;
  classType: string;
  teacher: string;
  classroom: string;
  startTime: string;
  endTime: string;
  value: boolean;
  message: string;
}

@Component({
  selector: 'app-schedule-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ExportButtonsComponent,
  ],
  template: `
    <div class="schedule-container">
      <div class="header">
        <h1>Horario</h1>
        <app-export-buttons></app-export-buttons>
      </div>
      <div class="table-container">
        <table class="schedule-table">
          <thead>
            <tr>
              <th>Hora</th>
              <th *ngFor="let day of days">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let time of timeSlots">
              <td class="time-cell">{{ time }}</td>
              <td
                *ngFor="let day of days"
                class="schedule-cell"
                [ngClass]="{ 'invalid-class': !isValidClass(day, time) }"
                [style.background-color]="getClassColor(day, time)"
                [attr.rowspan]="getClassSpan(day, time)"
              >
                <ng-container *ngIf="getClassInfo(day, time) as info">
                  <div class="class-info" [class.invalid-class]="!info.value">
                    <div class="subject">{{ info.course }}</div>
                    <div class="type">
                      {{ info.classType }}
                      <mat-icon
                        *ngIf="!info.value"
                        class="error-icon"
                        matTooltip="{{ info.message }}"
                      >
                        warning
                      </mat-icon>
                    </div>
                    <div class="time">
                      {{ info.startTime | slice : 0 : 5 }} -
                      {{ info.endTime | slice : 0 : 5 }}
                    </div>
                    <div class="teacher">{{ info.teacher }}</div>
                    <div class="room">{{ info.classroom }}</div>
                  </div>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./schedule-manager.component.css'],
})
export class ScheduleManagerComponent implements OnInit {
  days: DayOfWeek[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  timeSlots: string[] = this.generateTimeSlots();
  allCourses: Course[] = [];

  ngOnInit() {
    const data = history.state?.scheduleData;
    if (data) {
      this.allCourses = data.cycles.flatMap(
        (cycle: { courses: Course[] }) => cycle.courses
      );
    }
  }

  getClassInfo(day: string, time: string): ScheduleInfo | null {
    for (const course of this.allCourses) {
      for (const detail of course.details) {
        for (const type of detail.classTypes) {
          if (
            type.day === day &&
            this.isTimeInRange(time, type.startTime, type.endTime)
          ) {
            return {
              course: course.course,
              classType: type.classType,
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

  getClassColor(day: string, time: string): string {
    const info = this.getClassInfo(day, time);
    if (!info) return 'transparent';
    if (!info.value) return '#ffebee'; // Color rojo claro para clases inválidas
    return info.classType === 'T' ? '#e3f2fd' : '#e8f5e9';
  }

  isValidSchedule(day: string, time: string): boolean {
    const info = this.getClassInfo(day, time);
    return info ? info.value : true;
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

  exportToPDF() {
    console.log('Exportando a PDF...');
    // Implementar exportación a PDF
  }

  exportToExcel() {
    console.log('Exportando a Excel...');
    // Implementar exportación a Excel
  }

  isValidClass(day: string, time: string): boolean {
    const info = this.getClassInfo(day, time);
    return info ? info.value : true;
  }
}
