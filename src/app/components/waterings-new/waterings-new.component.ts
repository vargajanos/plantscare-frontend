import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-waterings-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './waterings-new.component.html',
  styleUrl: './waterings-new.component.scss'
})
export class WateringsNewComponent implements OnInit {
  wateringForm: FormGroup;
  plants: any[] = [];
  isSubmitting = false;
  errorMessage = '';
  loading = true;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form with default values
    this.wateringForm = this.fb.group({
      plant_id: ['', Validators.required],
      date: [this.formatDateForInput(new Date()), Validators.required],
      amount_ml: [100, [Validators.required, Validators.min(1), Validators.max(1000)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadPlants();
    
    // Check if a plant_id was passed as a query parameter
    this.route.queryParams.subscribe(params => {
      if (params['plant_id']) {
        this.wateringForm.patchValue({
          plant_id: params['plant_id']
        });
      }
    });
  }

  loadPlants(): void {
    this.loading = true;
    
    this.api.getPlants().subscribe({
      next: (data: any) => {
        this.plants = data;
        this.loading = false;
        
        // If there's at least one plant and no plant is selected, select the first one
        if (this.plants.length > 0 && !this.wateringForm.get('plant_id')?.value) {
          this.wateringForm.patchValue({
            plant_id: this.plants[0].id
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load plants. Please try again later.';
        console.error('Error loading plants', error);
      }
    });
  }

  onSubmit(): void {
    if (this.wateringForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.api.postWatering(this.wateringForm.value).subscribe({
      next: () => {
        this.router.navigate(['/waterings']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'An error occurred while saving the watering record';
        console.error('Error saving watering record', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/waterings']);
  }

  // Helper method to format date for input field
  private formatDateForInput(date: Date): string {
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }
}