export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export interface ClassSession {
  subject: string;
  professor: string;
  classroom: string;
  color: string;
  startTime: string;
  endTime: string;
  day: DayOfWeek;
  rowSpan?: number;
}

export interface ScheduleData {
  [key: string]: {
    [key: string]: ClassSession;
  };
}
