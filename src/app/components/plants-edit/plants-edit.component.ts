import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-plants-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plants-edit.component.html',
  styleUrl: './plants-edit.component.scss'
})
export class PlantsEditComponent implements OnInit {
  plantForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  loading = true;
  plantId: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.plantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      species: ['', Validators.required],
      location: [''],
      water_interval_days: [7, [Validators.required, Validators.min(1), Validators.max(90)]],
      description: ['']
    });
    
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadPlantData();
  }

  loadPlantData(): void {
    this.loading = true;
    this.api.getOnePlant(this.plantId).subscribe({
      next: (plant: any) => {
        this.plantForm.patchValue(plant);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load plant details';
        this.loading = false;
        console.error('Error loading plant', error);
      }
    });
  }

  onSubmit(): void {
    if (this.plantForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.api.updatePlant(this.plantId, this.plantForm.value).subscribe({
      next: () => {
        this.router.navigate(['/plants']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'An error occurred while updating the plant';
        console.error('Error updating plant', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/plants']);
  }
}