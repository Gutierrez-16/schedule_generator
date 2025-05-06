export interface Group {
  id: number;
  group: string;
  fullName: string;
  day: string;
  start: string;
  end: string;
  classRoom: string;
}

export interface Course {
  id: number;
  name: string;
  credits: number;
  groups: Group[];
}

export interface Cycle {
  id: number;
  name: string;
  courses: Course[];
}
