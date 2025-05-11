import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Career } from '@app/features/cycles/interfaces/cycle.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private readonly apiUrl = `${environment.apiUrl}/assignments`;

  constructor(private http: HttpClient) {}

  getAssignmentsByCareer(careerId: number): Observable<Career> {
    return this.http.get<Career>(`${this.apiUrl}/${careerId}`);
  }
}
