import { Component, Input, OnInit } from '@angular/core';
import { IPlantsList } from './models/iplants-model';
import { PlantsService } from './shared/plants.service';
import { ActivatedRoute } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})

export class PlantsListComponent implements OnInit {

  plants: IPlantsList[] = [];
  todayDate: Date = new Date();
  month = this.todayDate.toLocaleString('default', { month: 'long' });
  plant!: IPlantsList[];
  search='';

  public static readonly ADDNEWPLANT_WEBSITE_URL: string = '/add-new-plant';
  public static readonly FULL_YEAR_ARRAY: number = 11;

  constructor(private plantsService: PlantsService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.plants = this.route.snapshot.data['plants']
  }

  openAddNewPlant() {
    const link = document.createElement('a');
    link.href = PlantsListComponent.ADDNEWPLANT_WEBSITE_URL;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  filterBySowingMonths() {
    var filteredPlant: IPlantsList[] = [];
    for (let plant of this.plants) {
      if(plant.sowingMonths.includes(this.month)){
        filteredPlant.push(plant);
      }
    }
    this.plants = filteredPlant;
  }

  filterAll() {
    this.plants = this.route.snapshot.data['plants']
  }

  onPlantDeleted(plant: IPlantsList){
    var index = this.plants.findIndex((deletedPlant) => (deletedPlant === plant));
    if (index != -1) {
      this.plants.splice(index, 1);
    }
  }

}
