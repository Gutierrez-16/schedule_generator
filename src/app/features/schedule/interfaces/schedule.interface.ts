export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export interface CourseDetail {
  classroom: string;
  day: string;
  startTime: string;
  endTime: string;
  teacher: string;
}

export interface Course {
  assignmentId: number;
  courseId: number;
  course: string;
  credits: number;
  details: CourseDetail[];
}
