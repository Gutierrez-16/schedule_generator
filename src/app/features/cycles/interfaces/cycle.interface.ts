import { Course } from "features/schedule/interfaces/schedule.interface";

export interface Cycle {
  cycle: string;
  courses: Course[];
}

export interface Career {
  career: string;
  cycles: Cycle[];
}
