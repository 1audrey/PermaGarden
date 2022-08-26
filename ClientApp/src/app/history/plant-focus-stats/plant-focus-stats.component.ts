import { Component, Input, OnInit } from '@angular/core';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { ArchivedTaskService } from 'src/app/services/archivedTasks/archived-task.service';
import { ITask } from 'src/app/task/models/itask-model';

@Component({
  selector: 'app-plant-focus-stats',
  templateUrl: './plant-focus-stats.component.html',
  styleUrls: ['./plant-focus-stats.component.css']
})
export class PlantFocusStatsComponent implements OnInit {
  selectedFilter!: string;
  averagePeriodBetweenSowingAndPlanting!: number;
  averagePeriodBetweenPlantingAndHarvesting!: number;

  constructor(private archivedTaskService: ArchivedTaskService) {
  }

  @Input() selectedPlant!: IPlantsList;
  @Input() archivedTasks!: ITask[];

  ngOnInit() {
    this.archivedTaskService.getData(this.selectedPlant, this.archivedTasks);
    this.averagePeriodBetweenSowingAndPlanting = this.archivedTaskService.averagePeriodBetweenStartAndTransplant;
    this.averagePeriodBetweenPlantingAndHarvesting = this.archivedTaskService.averagePeriodBetweenPlantingAndHarvesting;
  }

  plantPeriodBetweenSowingAndTransplant(){
    return this.selectedPlant.plantSowingPeriod;
  }

  plantPeriodBetweenPlantingAndHarvesting(){
    return this.selectedPlant.plantGrowingPeriod;
  }
}



