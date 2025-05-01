import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatIconModule, ReactiveFormsModule, MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  isLoading = false;

  onSubmit() {
    if (this.emailForm.valid && !this.isLoading) {
      this.isLoading = true;
      const email = this.emailForm.get('email')?.value;
      
      this.snackBar.open('Código enviado al correo', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      this.router.navigate(['/auth/reset-password'], {
        state: { email }
      });
    }
  }
}
