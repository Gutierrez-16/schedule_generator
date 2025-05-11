export interface BlockedHour {
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
  blockedHours: BlockedHour[];
}

export interface GenerateScheduleRequest {
  careerId: number;
  preferences: PreferencesRequest;
  courseIds: string[];
}
