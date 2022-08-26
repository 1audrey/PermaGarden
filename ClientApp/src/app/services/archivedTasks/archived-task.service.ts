import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { ITask } from 'src/app/task/models/itask-model';

@Injectable({
  providedIn: 'root'
})
export class ArchivedTaskService {
  averagePeriodBetweenStartAndTransplant!: number;
  averagePeriodBetweenPlantingAndHarvesting!: number;
  isLoaded = false;

  constructor() { }

  getData(selectedPlant: IPlantsList, archivedTasks: ITask[]){
    this.calculateAverageRealTransplantPeriod(selectedPlant, archivedTasks);
    this.calculateAverageRealHarvestPeriod(selectedPlant, archivedTasks);
  }

  calculateAverageRealTransplantPeriod(plant: IPlantsList, archivedTasks: ITask[]) {
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    this.setsAveragePeriodBetweenStartAndTransplant(plantsInArchived);
  }

  calculateAverageRealHarvestPeriod(plant: IPlantsList, archivedTasks: ITask[]) {
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    this.setsAveragePeriodBetweenPlantingAndHarvesting(plantsInArchived);
  }

  private initialisePlantsInTasks(plant: IPlantsList, archivedTasks: ITask[]): ITask[]{
    let plantsInArchived: ITask[] = [];

    archivedTasks.forEach((taskWithSelectedPlant) => {
      if (taskWithSelectedPlant.plantId === plant.plantId) {
        plantsInArchived.push(taskWithSelectedPlant);
      }
    });
    return plantsInArchived;
  }

  private setsAveragePeriodBetweenStartAndTransplant(plantsInArchived: ITask[]){
    this.averagePeriodBetweenStartAndTransplant = 0;
    if(plantsInArchived.length != 0){
      this.averagePeriodBetweenStartAndTransplant = this.calculateNumberOfDays(plantsInArchived)/plantsInArchived.length;
    }
    else{ this.averagePeriodBetweenStartAndTransplant = this.calculateNumberOfDays(plantsInArchived);
    }
  }

  private calculateNumberOfDays(plantsInArchived: ITask[]): number {
    let totalNumberOfDays = 0;
    let numberOfDays= 0;
    plantsInArchived.forEach((task) => {
      if (task.transplantDate) {
        let transplantDate = new Date(task.transplantDate);
        let startingDate = new Date(task.startingDate);
        numberOfDays = this.calculateDifferenceBetweenTwoDates(transplantDate, startingDate);
      }
      return totalNumberOfDays += numberOfDays ;
    })

    return totalNumberOfDays ;
  }

  private setsAveragePeriodBetweenPlantingAndHarvesting(plantsInArchived: ITask[]){
    this.averagePeriodBetweenPlantingAndHarvesting = 0;
    if(plantsInArchived.length != 0){
      this.averagePeriodBetweenPlantingAndHarvesting = this.calculateNumberOfDaysForHavest(plantsInArchived)/plantsInArchived.length;
    }
    else{
      this.averagePeriodBetweenPlantingAndHarvesting = this.calculateNumberOfDaysForHavest(plantsInArchived)
    }
  }

  private calculateNumberOfDaysForHavest(plantsInArchived: ITask[]): number {
    let totalNumberOfDays = 0;
    let numberOfDays= 0;

    plantsInArchived.forEach((task) => {
      if (task.realHarvestingDates) {
        let harvestDate = new Date(task.realHarvestingDates.split(',')[0]);
        let plantingDate = this.setUpPlantingDate(task);
        numberOfDays = this.calculateDifferenceBetweenTwoDates(harvestDate, plantingDate);
      }
      return totalNumberOfDays += numberOfDays ;
    })

    return totalNumberOfDays ;
  }

  private calculateDifferenceBetweenTwoDates(actionDate: Date, startDate: Date){
    let lastDate = moment(actionDate.toString().substring(0, 15));
    let firstDate = moment(startDate.toString().substring(0, 15));
    return Math.ceil(lastDate.diff(firstDate, 'days'));
  }

  private setUpPlantingDate(task: ITask){
    if(task.transplantDate){
      return new Date(task.transplantDate);
    }
    else{
      return new Date(task.startingDate);
    }
  }

}
