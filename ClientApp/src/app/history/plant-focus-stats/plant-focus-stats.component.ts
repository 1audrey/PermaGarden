import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatchShapeModel } from 'src/app/homepage/garden-canvas/models/iPatchShape-model';
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
  averageProductivityWeightBySeed!: number;
  totalNumberPlants!: number;
  totalHarvestedWeight!: number;
  mostProductivePatchName!: string;
  startingDateForBestProductivity!: string;
  patches!: IPatchShapeModel[];
  archivedPatches!: IPatchShapeModel[];
  allPatches: IPatchShapeModel[] = [];
  archivedPlants!:IPlantsList[];
  allPlants: IPlantsList[] = [];
  plants!: IPlantsList[];
  bestCompanionPlants: string[] =[];

  constructor(private archivedTaskService: ArchivedTaskService, private route: ActivatedRoute) {
  }

  @Input() selectedPlant!: IPlantsList;
  @Input() archivedTasks!: ITask[];

  ngOnInit() {
    ///get all plants
    this.plants = this.route.snapshot.data['plants'];
    this.archivedPlants = this.route.snapshot.data['archivedPlants']
    this.plants.forEach((plant)=> this.allPlants.push(plant));
    this.archivedPlants.forEach((plant) => this.allPlants.push(plant));

    //get all patches
    this.patches = this.route.snapshot.data['patches'];
    this.archivedPatches = this.route.snapshot.data['archivedPatches'];
    this.patches.forEach((patch) => this.allPatches.push(patch));
    this.archivedPatches.forEach((patch) => this.allPatches.push(patch));

    this.archivedTaskService.getData(this.selectedPlant, this.archivedTasks);
    this.averagePeriodBetweenSowingAndPlanting = this.archivedTaskService.averagePeriodBetweenStartAndTransplant;
    this.averagePeriodBetweenPlantingAndHarvesting = this.archivedTaskService.averagePeriodBetweenPlantingAndHarvesting;
    this.averageProductivityWeightBySeed = this.archivedTaskService.averageProductivityWeightBySeed;
    this.totalNumberPlants = this.archivedTaskService.totalNumberPlants;
    this.totalHarvestedWeight = this.archivedTaskService.totalHarvestedWeight;
    this.startingDateForBestProductivity = this.archivedTaskService.startingDateForBestProductivity;
    this.getPlantNameById(this.archivedTaskService.bestCompanionPlants);
    this.getPatchNameById(this.archivedTaskService.mostProductivePatchId);
  }

  plantPeriodBetweenSowingAndTransplant() {
    return this.selectedPlant.plantSowingPeriod;
  }

  plantPeriodBetweenPlantingAndHarvesting() {
    return this.selectedPlant.plantGrowingPeriod;
  }

  private getPatchNameById(patchId: number) {
    this.allPatches.forEach((patch) => {
      if (patchId === patch.patchId) {
        this.mostProductivePatchName = patch.patchName;
      }
    });
  }

  private getPlantNameById(plantId: number[]){
    this.allPlants.forEach((plant) => {
      plantId.forEach((id)=>{
        if (id === plant.plantId) {
          this.bestCompanionPlants.push(plant.plantName);
        }
      });
    });
  }
}



