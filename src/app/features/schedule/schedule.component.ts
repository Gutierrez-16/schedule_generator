import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClassSession, DayOfWeek, ScheduleData } from './interfaces/schedule.interface';
import { ExportButtonsComponent } from './components/export-buttons/export-buttons.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ExportButtonsComponent]
})
export class ScheduleComponent implements OnInit {
  timeSlots: string[] = this.generateTimeSlots();
  days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  schedule: ScheduleData = {};

  private cellVisibility: { [key: string]: boolean } = {};

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    let hour = 7;
    let minutes = 0;

    while (hour <= 23 || (hour === 23 && minutes <= 15)) {
      slots.push(this.formatTime(hour, minutes));
      minutes += 45;  // Bloques de 45 minutos
      if (minutes >= 60) {
        hour += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
    }
    return slots;
  }

  ngOnInit() {
    const clases = [
      {
        day: 'Lunes',
        startTime: '07:00',
        endTime: '08:30',
        subject: 'Matemáticas',
        professor: 'Dr. García',
        classroom: 'A101',
        color: '#4fc3f7'
      },
      {
        day: 'Lunes',
        startTime: '08:30',
        endTime: '10:00',
        subject: 'Programación',
        professor: 'Ing. López',
        classroom: 'Lab 1',
        color: '#81c784'
      },
      {
        day: 'Miércoles',
        startTime: '07:00',
        endTime: '08:30',
        subject: 'Base de Datos',
        professor: 'Dra. Ruiz',
        classroom: 'Lab 2',
        color: '#ffb74d'
      }
    ];

    clases.forEach(clase => {
      this.addNewClass(clase.day as DayOfWeek, clase.startTime, clase.endTime, {
        subject: clase.subject,
        professor: clase.professor,
        classroom: clase.classroom,
        color: clase.color,
        day: clase.day as DayOfWeek
      });
    });
  }

  // Simplificar método para agregar clases
  addNewClass(day: DayOfWeek, startTime: string, endTime: string, classData: Omit<ClassSession, 'startTime' | 'endTime'>): void {
    if (!this.schedule[day]) {
      this.schedule[day] = {};
    }

    const classId = `${day}_${startTime}`; // ID más predecible
    this.schedule[day][classId] = {
      ...classData,
      startTime,
      endTime
    };

    this.calculateRowSpans();
  }

  removeClass(day: DayOfWeek, classId: string): void {
    if (this.schedule[day] && this.schedule[day][classId]) {
      delete this.schedule[day][classId];
      if (Object.keys(this.schedule[day]).length === 0) {
        delete this.schedule[day];
      }
      this.calculateRowSpans();
    }
  }

  private calculateRowSpans() {
    this.cellVisibility = {};
    this.days.forEach(day => {
      Object.values(this.schedule[day] || {}).forEach(session => {
        const startSlot = this.timeSlots.indexOf(session.startTime);
        let endSlot = -1;
        
        // Encontrar el slot más cercano al tiempo de fin
        const endTimeMinutes = this.timeToMinutes(session.endTime);
        for (let i = 0; i < this.timeSlots.length; i++) {
          const slotMinutes = this.timeToMinutes(this.timeSlots[i]);
          if (slotMinutes >= endTimeMinutes) {
            endSlot = i;
            break;
          }
        }
        
        if (startSlot !== -1 && endSlot !== -1) {
          session.rowSpan = endSlot - startSlot;
          // Ocultar celdas intermedias
          for (let i = startSlot + 1; i < endSlot; i++) {
            this.cellVisibility[`${day}-${this.timeSlots[i]}`] = false;
          }
        }
      });
    });
  }

  private getTimeSlotsBetween(startTime: string, endTime: string): string[] {
    const slots: string[] = [];
    let currentTime = startTime;
    
    while (this.timeToMinutes(currentTime) < this.timeToMinutes(endTime)) {
      slots.push(currentTime);
      currentTime = this.addMinutesToTime(currentTime, 45);
    }
    
    return slots;
  }

  private addMinutesToTime(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + mins + minutes;
    
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  }

  calculateClassSpan(session: ClassSession | null): number {
    if (!session) return 1;
    
    const startSlot = this.timeSlots.indexOf(session.startTime);
    const endTimeMinutes = this.timeToMinutes(session.endTime);
    
    // Encontrar el slot más cercano al tiempo de fin
    let endSlot = this.timeSlots.findIndex(time => 
      this.timeToMinutes(time) >= endTimeMinutes
    );
    
    if (endSlot === -1) endSlot = this.timeSlots.length;
    
    return endSlot - startSlot;
  }

  shouldShowCell(day: DayOfWeek, time: string): boolean {
    const currentClass = this.getClass(day, time);
    if (!currentClass) return true;
    return currentClass.startTime === time;
  }

  private formatTime(hour: number, minutes: number): string {
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getClass(day: DayOfWeek, time: string): ClassSession | null {
    if (!this.schedule[day]) return null;
    
    return Object.values(this.schedule[day]).find(session => {
      const timeMin = this.timeToMinutes(time);
      const startMin = this.timeToMinutes(session.startTime);
      const endMin = this.timeToMinutes(session.endTime);
      return timeMin >= startMin && timeMin < endMin;
    }) || null;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
  }

  formatTimeRange(startTime: string, endTime: string): string {
    const formatHour = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hourNum = parseInt(hours);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
      return `${hour12}:${minutes} ${period}`;
    };

    return `${formatHour(startTime)} - ${formatHour(endTime)}`;
  }
}
