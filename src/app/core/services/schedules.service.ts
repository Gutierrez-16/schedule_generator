import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  GenerateSchedulesRequest,
  ApiResponse,
} from '../interfaces/schedule.interface';
import { Career } from '@app/features/cycles/interfaces/cycle.interface';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private readonly apiUrl = `${environment.apiUrl}/schedules`;

  constructor(private http: HttpClient) {}

  generateSchedules(
    request: GenerateSchedulesRequest
  ): Observable<ApiResponse<Career>> {
    return this.http.post<ApiResponse<Career>>(this.apiUrl, request);
  }
}
