import { Course } from './schedule.interface';

export interface ScheduleData {
  career: string;
  cycles: {
    cycle: string;
    courses: Course[];
  }[];
}

export interface ScheduleOption {
  scheduleData: ScheduleData;
  optionNumber: number;
}
