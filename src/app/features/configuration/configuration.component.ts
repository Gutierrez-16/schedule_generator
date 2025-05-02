import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CompanyConfig } from '../../core/interfaces/company-config.interface';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  configForm!: FormGroup;
  logoPreview: string | null = null;
  isLoading = false;
  isNewConfig = true; // Flag to track if creating new or updating

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkExistingConfig();
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    const input = event.key;
    const isNumber = /^\d+$/.test(input);
    const isControl = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key);
    
    if (!isNumber && !isControl) {
      event.preventDefault();
    }
    return isNumber || isControl;
  }

  private checkExistingConfig() {
    // Simulate API call to check existing config
    this.isLoading = true;
    setTimeout(() => {
      const existingConfig = localStorage.getItem('institutionConfig');
      if (existingConfig) {
        this.isNewConfig = false;
        const config = JSON.parse(existingConfig);
        this.configForm.patchValue(config);
        this.logoPreview = config.logoUrl;
      }
      this.isLoading = false;
    }, 500);
  }

  private initForm() {
    this.configForm = this.fb.group({
      ruc: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{11}$/)
      ]],
      name: ['', [Validators.required]],
      businessName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      concept: ['', [Validators.required]],
      logoUrl: ['']
    });
  }

  onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
        this.configForm.patchValue({ logoUrl: reader.result });
        // Clear input to allow selecting same file again
        this.fileInput.nativeElement.value = '';
      };
      reader.readAsDataURL(file);
    }
  }

  // Allow click on preview to trigger file input
  onLogoClick() {
    this.fileInput.nativeElement.click();
  }

  onSubmit() {
    if (this.configForm.valid && !this.isLoading) {
      this.isLoading = true;
      const config = this.configForm.value;
      
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('institutionConfig', JSON.stringify(config));
        this.snackBar.open(
          this.isNewConfig ? 'Configuración creada' : 'Configuración actualizada', 
          'OK', 
          { duration: 3000 }
        );
        this.isNewConfig = false;
        this.isLoading = false;
      }, 1000);
    }
  }
}
