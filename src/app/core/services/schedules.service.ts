import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ScheduleRequest } from '../interfaces/ScheduleRequest';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private readonly apiUrl = `${environment.apiUrl}/schedules`;

  constructor(private http: HttpClient) {}

  saveSchedule(schedule: ScheduleRequest): Observable<void> {
    console.log('saving schedule', schedule);
    
    return this.http.post<void>(this.apiUrl, schedule);
  }
}
