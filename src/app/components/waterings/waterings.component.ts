import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-waterings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './waterings.component.html',
  styleUrl: './waterings.component.scss'
})
export class WateringsComponent implements OnInit {
  waterings: any[] = [];
  plants: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  selectedPlantId: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.loading = true;
    this.error = null;
    
    this.api.getPlants().subscribe({
      next: (data: any) => {
        this.plants = data;
        this.loading = false;
        
        if (this.plants.length > 0) {
          this.selectedPlantId = this.plants[0].id;
          this.loadWaterings(this.selectedPlantId!);
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to load plants. Please try again later.';
        console.error('Error loading plants', error);
      }
    });
  }

  loadWaterings(plantId: number): void {
    this.loading = true;
    this.error = null;
    this.selectedPlantId = plantId;
    
    this.api.getWateringById(plantId).subscribe({
      next: (data: any) => {
        this.waterings = data;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.waterings = [];
          this.loading = false;
          return;
        }
        
        this.loading = false;
        this.error = 'Failed to load watering records. Please try again later.';
        console.error('Error loading waterings', error);
      }
    });
  }

  deleteWatering(id: number): void {
    if(confirm('Are you sure you want to delete this watering record?')) {
      this.api.deleteWatering(id).subscribe({
        next: () => {
          this.waterings = this.waterings.filter(watering => watering.id !== id);
        },
        error: (error) => {
          console.error('Error deleting watering record', error);
          alert('Failed to delete watering record. Please try again.');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  getPlantName(plantId: number): string {
    const plant = this.plants.find(p => p.id === plantId);
    return plant ? plant.name : 'Unknown Plant';
  }
}