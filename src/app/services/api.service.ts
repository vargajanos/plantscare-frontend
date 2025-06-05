import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private server = "http://localhost:3000/api";

  getPlants(){
    return this.http.get(`${this.server}/plants`);
  }

  getOnePlant(id: number){
    return this.http.get(`${this.server}/plants/${id}`);
  }

  postplant(plant: object){
    return this.http.post(`${this.server}/plants`, plant);
  }

  updatePlant(id: number, plant: object){
    return this.http.patch(`${this.server}/plants/${id}`, plant);
  }

  deletePlant(id: number){
    return this.http.delete(`${this.server}/plants/${id}`);
  }

  getStats(){
    return this.http.get(`${this.server}/plants/stats`);
  }

  getWateringById(id: number) {
    return this.http.get(`${this.server}/plants/${id}/waterings`);
  }

  postWatering(watering: object) {
    return this.http.post(`${this.server}/waterings`, watering);
  }

  deleteWatering(id: number) {
    return this.http.delete(`${this.server}/waterings/${id}`);
  }

}
