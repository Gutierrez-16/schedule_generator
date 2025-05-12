export type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado';

export interface ClassType {
  assignmentDetailId: number;
  classroom: string;
  classType: string;
  day: string;
  startTime: string; // Changed from Time to string for frontend
  endTime: string; // Changed from Time to string for frontend
  value: boolean; // Added for checkbox value
  message: string; // Added for checkbox message
}

export interface CourseDetail {
  teacher: string;
  classTypes: ClassType[];
}

export interface Course {
  courseId: string;
  course: string;
  credits: number;
  details: CourseDetail[];
}

// Note: Course interface is used by CycleResponse in cycles.interface.ts
