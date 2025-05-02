import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatIconModule, ReactiveFormsModule, MatSnackBarModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  resetForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  isResending = false;

  ngOnInit() {
    const email = history.state?.email;

    if (!email) {
      this.router.navigate(['/auth/forgot-password']);
      return;
    }

    this.resetForm = this.fb.group({
      email: new FormControl({ value: email, disabled: true }),
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid && !this.isLoading) {
      this.isLoading = true;
      setTimeout(() => {
        this.snackBar.open('Contraseña actualizada correctamente', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      }, 1000);
    }
  }

  resendCode() {
    if (this.isResending) return;
    
    const email = this.resetForm.get('email')?.value;
    this.isResending = true;

    // Simular llamada a API
    setTimeout(() => {
      this.snackBar.open('Código enviado correctamente', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.isResending = false;
    }, 1500);
  }
}
