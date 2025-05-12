import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DayOfWeek,
  Course,
  GenerateSchedulesRequest,
  PreferencesRequest,
  CourseDetail,
  ClassType,
} from '@app/core/interfaces/schedule.interface';
import { ExportButtonsComponent } from './components/export-buttons/export-buttons.component';
import { SchedulesService } from '@app/core/services/schedules.service';
import { Cycle } from '@app/features/cycles/interfaces/cycle.interface';

export interface AssignmentDetailResponse {
  assignmentDetailId: number;
  career: string;
  cycle: string;
  classType: string;
  courseId: number;
  courseName: string;
  credits: number;
  professorName: string;
  classroomName: string;
  day: string;
  startTime: string;
  endTime: string;
}

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
  readonly defaultCareerId = 1;
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

  constructor(private schedulesService: SchedulesService) {}

  ngOnInit() {
    console.log('Inicializando componente Schedule');
  }

  @Input() set scheduleData(data: Cycle[] | null) {
    console.log('📅 Recibiendo datos:', data);
    if (data && data.length > 0) {
      const coursesData = data[0].courses;
      this.courses = coursesData.map((course) => ({
        courseId: String(course.courseId),
        course: course.course,
        credits: course.credits,
        details: course.details.map((detail) => ({
          teacher: detail.teacher,
          classTypes: detail.classTypes.map((ct) => ({
            assignmentDetailId: ct.assignmentDetailId,
            classroom: ct.classroom,
            classType: ct.classType,
            day: ct.day,
            startTime: this.formatTime(ct.startTime),
            endTime: this.formatTime(ct.endTime),
          })),
        })),
      }));
    }
  }

  private processCourses(courses: Course[]): Course[] {
    return courses.map((course) => ({
      ...course,
      courseId: String(course.courseId),
      details: course.details.map((detail: CourseDetail) => ({
        teacher: detail.teacher,
        classTypes: detail.classTypes.map((ct: ClassType) => ({
          assignmentDetailId: ct.assignmentDetailId,
          classroom: ct.classroom,
          classType: ct.classType,
          day: ct.day,
          startTime: this.formatTime(ct.startTime),
          endTime: this.formatTime(ct.endTime),
        })),
      })),
    }));
  }

  private formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5);
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
    const course = this.courses.find((c) =>
      c.details.some((d) =>
        d.classTypes.some(
          (ct) =>
            ct.day === day && this.isTimeInRange(time, ct.startTime, ct.endTime)
        )
      )
    );

    if (!course) return null;

    const detail = course.details.find((d) =>
      d.classTypes.some(
        (ct) =>
          ct.day === day && this.isTimeInRange(time, ct.startTime, ct.endTime)
      )
    );

    if (!detail) return null;

    const classType = detail.classTypes.find(
      (ct) =>
        ct.day === day && this.isTimeInRange(time, ct.startTime, ct.endTime)
    );

    if (!classType) return null;

    return {
      ...course,
      color: classType.classType,
      subject: `${course.course} (${classType.classType})`,
      professor: detail.teacher,
      classroom: classType.classroom,
      startTime: classType.startTime,
      endTime: classType.endTime,
    };
  }

  private isTimeInRange(current: string, start: string, end: string): boolean {
    const currentMinutes = this.timeToMinutes(current);
    const startMinutes = this.timeToMinutes(start);
    const endMinutes = this.timeToMinutes(end);
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }

  shouldShowCell(day: string, time: string): boolean {
    const course = this.getClass(day, time);
    if (!course) return true;

    const detail = course.details.find((d) =>
      d.classTypes.some((ct) => ct.day === day)
    );

    if (!detail) return true;

    return detail.classTypes.some(
      (ct) => this.formatTime(ct.startTime) === time
    );
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
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  generateSchedule() {
    const preferences: PreferencesRequest = {
      avoidDays: [],
      avoidStartHour: '07:00',
      preferredTeachers: [],
      preferredModalities: [],
      maxHoursPerDay: 8,
      minDaysPerWeek: 3,
      maxDaysPerWeek: 6,
      blockedHours: [],
    };

    const request: GenerateSchedulesRequest = {
      careerId: this.defaultCareerId,
      preferences: preferences,
      courseIds: this.courses.map((c) => Number(c.courseId)),
    };

    this.schedulesService.generateSchedules(request).subscribe({
      next: (response) => {
        if (response.success) {
          const assignments =
            response.data as unknown as AssignmentDetailResponse[];
          this.updateSchedule(assignments);
        }
      },
      error: (error) => console.error('Error generating schedule:', error),
    });
  }

  private updateSchedule(assignments: AssignmentDetailResponse[]) {
    this.courses = assignments.reduce((courses: Course[], assignment) => {
      const existingCourse = courses.find(
        (c: Course) => c.courseId === String(assignment.courseId)
      );

      if (existingCourse) {
        existingCourse.details[0].classTypes.push({
          assignmentDetailId: assignment.assignmentDetailId,
          classroom: assignment.classroomName,
          classType: assignment.classType,
          day: assignment.day,
          startTime: assignment.startTime,
          endTime: assignment.endTime,
        });
      } else {
        courses.push({
          courseId: String(assignment.courseId),
          course: assignment.courseName,
          credits: assignment.credits,
          details: [
            {
              teacher: assignment.professorName,
              classTypes: [
                {
                  assignmentDetailId: assignment.assignmentDetailId,
                  classroom: assignment.classroomName,
                  classType: assignment.classType,
                  day: assignment.day,
                  startTime: assignment.startTime,
                  endTime: assignment.endTime,
                },
              ],
            },
          ],
        });
      }

      return courses;
    }, [] as Course[]);
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
