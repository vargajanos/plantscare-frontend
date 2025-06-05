import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { PlantsNewComponent } from './components/plants-new/plants-new.component';
import { PlantsEditComponent } from './components/plants-edit/plants-edit.component';
import { WateringsComponent } from './components/waterings/waterings.component';
import { WateringsNewComponent } from './components/waterings-new/waterings-new.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard', 
        component: DashboardComponent  
    },
    {
        path: 'plants', 
        component: PlantsComponent
    },
    {
        path: 'plants/new', 
        component: PlantsNewComponent
    },
    {
        path: 'plants/edit/:id', 
        component: PlantsEditComponent 
    },
    {
        path: 'waterings', 
        component: WateringsComponent
    },
    {
        path: 'waterings/new', 
        component: WateringsNewComponent
    },
    { 
        path: '**', 
        redirectTo: 'dashboard' 
    }
];