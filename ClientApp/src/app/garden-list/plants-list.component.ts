import { Component, OnInit } from '@angular/core';
import { IPlantsList } from './models/iplants-model';
import { ActivatedRoute } from '@angular/router';
import { PlantsService } from '../services/plants/plants.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})

export class PlantsListComponent implements OnInit {
  plants!: IPlantsList[];
  month = new Date().toLocaleString('default', { month: 'long' });
  plant!: IPlantsList;
  search = '';
  appliedFilter= false;
  filteredPlant: IPlantsList[] = [];

  constructor(private plantService: PlantsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.plants = this.route.snapshot.data['plants'];
  }

  filterBySowingMonths() {
    this.filteredPlant = [];
     this.plants.forEach((plant) => {
       if (plant.plantStartingMonths.includes(this.month)) {
         this.filteredPlant.push(plant);
       }
     });
   this.plants = this.filteredPlant;
   this.appliedFilter = true;
  }

  filterAll() {
   this.appliedFilter = false;
   this.plants = this.route.snapshot.data['plants'];
  }

  onPlantDeleted(plant: IPlantsList){
   var index = this.plants.findIndex((deletedPlant) => (deletedPlant === plant));
   if (index != -1) {
     this.plants.splice(index, 1);
   }
  }

  plantToDelete(plant: IPlantsList) {
    this.plantService.plantToDelete(plant.plantName);
      this.onPlantDeleted(plant);

  }
}
