export type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado';

export type ClassTypeEnum = 'TEORIA' | 'PRACTICA' | 'LABORATORIO';

export interface ClassType {
  assignmentDetailId: number;
  classroom: string;
  classType: ClassTypeEnum;
  day: string;
  startTime: string; // Changed from Time to string for frontend
  endTime: string; // Changed from Time to string for frontend
}

export interface CourseDetail {
  teacher: string;
  classTypes: ClassType[];
}

export interface Course {
  assignmentId?: number; // Make optional to support both old and new data
  courseId: string;
  course: string;
  credits: number;
  details: CourseDetail[];
}

// Note: Course interface is used by CycleResponse in cycles.interface.ts
