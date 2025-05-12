import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  GenerateSchedulesRequest,
  ApiResponse,
} from '../interfaces/schedule.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private readonly apiUrl = `${environment.apiUrl}/schedules`;
  private scheduleDataSubject = new BehaviorSubject<any>(null);
  scheduleData$ = this.scheduleDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  generateSchedules(
    request: GenerateSchedulesRequest
  ): Observable<ApiResponse<any>> {
    console.log('🚀 Sending request to backend:', request);

    return this.http.post<ApiResponse<any>>(this.apiUrl, request).pipe(
      tap((response) => {
        console.log('📥 Response from backend:', response);
        if (response.success) {
          this.scheduleDataSubject.next(response.data);
        }
      })
    );
  }

  setScheduleData(data: any) {
    this.scheduleDataSubject.next(data);
  }

  getScheduleData() {
    return this.scheduleDataSubject.value;
  }
}
