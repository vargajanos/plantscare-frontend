import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.scss'
})
export class PlantsComponent implements OnInit {
  
  plants: any[] = [];
  loading: boolean = true;
  
  constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.api.getPlants().subscribe({
      next: (data: any) => {
        this.plants = data;
        this.loading = false;
        console.log(data);
      },
      error: (error: any) => {
        console.error('Hiba a lekérdezésben', error);
        this.loading = false;
      }
    });
  }

  deletePlant(id: number): void {
    if(confirm('Are you sure you want to delete this plant?')) {
      this.api.deletePlant(id).subscribe({
        next: () => {
          this.plants = this.plants.filter(plant => plant.id !== id);
        },
        error: (error) => {
          console.error('Error deleting plant', error);
        }
      });
    }
  }
}