import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PreferencesRequest } from '@app/core/interfaces/schedule.interface';

@Component({
  selector: 'app-preferences-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>Preferencias de Horario</h2>
    <mat-dialog-content>
      <form [formGroup]="preferencesForm">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Días a evitar</mat-label>
          <mat-select formControlName="avoidDays" multiple>
            <mat-option value="Lunes">Lunes</mat-option>
            <mat-option value="Martes">Martes</mat-option>
            <mat-option value="Miércoles">Miércoles</mat-option>
            <mat-option value="Jueves">Jueves</mat-option>
            <mat-option value="Viernes">Viernes</mat-option>
            <mat-option value="Sábado">Sábado</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Hora de inicio a evitar</mat-label>
          <input matInput type="time" formControlName="avoidStartHour" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Máximo horas por día</mat-label>
          <input
            matInput
            type="number"
            formControlName="maxHoursPerDay"
            min="1"
            max="12"
          />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Mínimo días por semana</mat-label>
          <input
            matInput
            type="number"
            formControlName="minDaysPerWeek"
            min="1"
            max="6"
          />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Máximo días por semana</mat-label>
          <input
            matInput
            type="number"
            formControlName="maxDaysPerWeek"
            min="1"
            max="6"
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Modalidades preferidas</mat-label>
          <mat-select formControlName="preferredModalities" multiple>
            <mat-option value="TEORIA">Teoría</mat-option>
            <mat-option value="PRACTICA">Práctica</mat-option>
            <mat-option value="LABORATORIO">Laboratorio</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()">
        Generar Horario
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        padding: 20px;
        min-width: 400px;
      }
      .full-width {
        width: 100%;
      }
      mat-form-field {
        margin-bottom: 16px;
        display: block;
      }
    `,
  ],
})
export class PreferencesModalComponent {
  preferencesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PreferencesModalComponent>
  ) {
    this.preferencesForm = this.fb.group({
      avoidDays: [[]],
      avoidStartHour: ['07:00'],
      preferredTeachers: [[]],
      preferredModalities: [['TEORIA', 'PRACTICA']],
      maxHoursPerDay: [8],
      minDaysPerWeek: [3],
      maxDaysPerWeek: [6],
      blockedHours: [[]],
    });
  }

  onSubmit(): void {
    if (this.preferencesForm.valid) {
      this.dialogRef.close(this.preferencesForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
