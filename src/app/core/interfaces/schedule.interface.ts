export type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado';

export interface BlockedHourRequest {
  day: string;
  start: string;
  end: string;
}

export interface PreferencesRequest {
  avoidDays: string[];
  avoidStartHour: string;
  preferredTeachers: string[];
  preferredModalities: string[];
  maxHoursPerDay: number;
  minDaysPerWeek: number;
  maxDaysPerWeek: number;
  blockedHours: BlockedHourRequest[];
}

export interface GenerateSchedulesRequest {
  careerId: number;
  preferences: PreferencesRequest;
  courseIds: number[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
export interface Cycle {
  cycle: string;
  courses: Course[];
}

export interface Career {
  career: string;
  cycles: Cycle[];
}
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
