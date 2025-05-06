import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../../features/schedule/schedule.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CourseSelectionComponent } from "../course-selection/course-selection.component";

@Component({
  selector: 'app-schedule-manager',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleComponent,
    MatDividerModule,
    MatTabsModule,
    MatIconModule,
    CourseSelectionComponent
],
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.css']
})
export class ScheduleManagerComponent {
  selectedTab = 0;
}
