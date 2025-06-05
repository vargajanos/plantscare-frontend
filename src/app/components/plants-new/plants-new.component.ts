import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-plants-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plants-new.component.html',
  styleUrl: './plants-new.component.scss'
})
export class PlantsNewComponent {
  plantForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.plantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      species: ['', Validators.required],
      location: [''],
      water_interval_days: [1, [Validators.required, Validators.min(1), Validators.max(90)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.plantForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.api.postplant(this.plantForm.value).subscribe({
      next: () => {
        this.router.navigate(['/plants']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'An error occurred while saving the plant';
        console.error('Error saving plant', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/plants']);
  }
}