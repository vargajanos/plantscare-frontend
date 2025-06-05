import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  totalPlants: number = 0;
  plantsNeedingWater: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = null;
    
    this.api.getStats().subscribe({
      next: (data: any) => {
        this.stats = data;
        this.calculateSummary();
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        this.error = 'Failed to load statistics. Please try again later.';
        console.error('Hiba a statisztika lekérés közben', error);
      }
    });
  }

  calculateSummary(): void {
    this.totalPlants = this.stats.length;
    this.plantsNeedingWater = this.stats.filter(plant => !plant.last_watered_date).length;
  }
  
  formatDate(dateString: string | null): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}