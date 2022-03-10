import { Component, OnInit } from '@angular/core';
import { IPlantsList } from './models/iplants-model';
import { ActivatedRoute } from '@angular/router';
import { PlantsService } from '../services/plants/plants.service';
import { NotificationsService } from '../services/notifications/notifications.service';


@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})

export class PlantsListComponent implements OnInit {

  plants!: IPlantsList[];
  todayDate: Date = new Date();
  month = this.todayDate.toLocaleString('default', { month: 'long' });
  plant!: IPlantsList;
  search = '';
  startMonths: string[] = []

  public static readonly ADDNEWPLANT_WEBSITE_URL: string = '/add-new-plant';
  public static readonly FULL_YEAR_ARRAY: number = 11;

  constructor(private plantService: PlantsService,
    private route: ActivatedRoute,
    private notifications: NotificationsService) {

  }

  ngOnInit() {
    this.plants = this.route.snapshot.data['plants'];
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
      if(plant.plantStartingMonths.includes(this.month)){
        filteredPlant.push(plant);
      }
    }
    this.plants = filteredPlant;
  }

  filterAll() {
    this.plants = this.route.snapshot.data['plants'];
  }

  onPlantDeleted(plant: IPlantsList){
    var index = this.plants.findIndex((deletedPlant) => (deletedPlant === plant));
    if (index != -1) {
      this.plants.splice(index, 1);
    }
  }

  plantToDelete(plant: IPlantsList) {
    this.plantService.plantToDelete(plant.plantName).subscribe(() => {
      this.notifications.showSuccess(`${plant.plantName} has been deleted`);
      this.onPlantDeleted(plant);
    });  
  }


}
