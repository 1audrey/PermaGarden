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
  averageProductivityWeightBySeed!: number;
  totalNumberPlants!: number;
  totalHarvestedWeight!: number;
  mostProductivePatchId!: number;
  startingDateForBestProductivity!: string;
  bestCompanionPlants!: number [];

  constructor() { }

  getData(selectedPlant: IPlantsList, archivedTasks: ITask[]){
    this.calculateAverageRealTransplantPeriod(selectedPlant, archivedTasks);
    this.calculateAverageRealHarvestPeriod(selectedPlant, archivedTasks);
    this.calculateProductivityWeightBySeed(selectedPlant, archivedTasks);
    this.calculateTotalNumberPlants(selectedPlant, archivedTasks);
    this.calculateTotalHavestedWeight(selectedPlant, archivedTasks);
    this.getMostProductivePatch(selectedPlant, archivedTasks);
    this.getStartingDateWhenBestProductivity(selectedPlant, archivedTasks);
    this.getBestCompanionPlants(selectedPlant, archivedTasks);
  }

  calculateAverageRealTransplantPeriod(plant: IPlantsList, archivedTasks: ITask[]) {
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    this.setsAveragePeriodBetweenStartAndTransplant(plantsInArchived);
  }

  calculateAverageRealHarvestPeriod(plant: IPlantsList, archivedTasks: ITask[]) {
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    this.setsAveragePeriodBetweenPlantingAndHarvesting(plantsInArchived);
  }

  calculateProductivityWeightBySeed(plant: IPlantsList, archivedTasks: ITask[]){
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    let totalWeight = 0;
    let totalSeeds = 0;

    plantsInArchived.forEach((task)=>{
      if(task.harvestedWeight){
        totalWeight += task.harvestedWeight.split(',').map(Number).reduce((sum, current) => sum + current, 0);
      }
      totalSeeds += task.seedsUsed;
      this.averageProductivityWeightBySeed = Math.round(totalWeight/totalSeeds);
    });
    return this.averageProductivityWeightBySeed;
  }

  calculateTotalNumberPlants(plant: IPlantsList, archivedTasks: ITask[]){
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    this.totalNumberPlants = plantsInArchived.length;
  }

  calculateTotalHavestedWeight(plant: IPlantsList, archivedTasks: ITask[]){
    let plantsInArchived= this.initialisePlantsInTasks(plant, archivedTasks);
    let totalWeight = 0;

    plantsInArchived.forEach((task)=>{
      if(task.harvestedWeight){
        totalWeight += task.harvestedWeight.split(',').map(Number).reduce((sum, current) => sum + current, 0);;
      }
      this.totalHarvestedWeight = totalWeight;
    });
  }

  getMostProductivePatch(plant: IPlantsList, archivedTasks: ITask[]){
    let plantsInArchived = this.initialisePlantsInTasks(plant, archivedTasks);

    plantsInArchived.forEach((task)=>{
      if(Math.max(this.calculateProductivityWeightBySeed(plant, archivedTasks))){
        this.mostProductivePatchId = task.patchId;
      };
    });
  }

  getStartingDateWhenBestProductivity(plant: IPlantsList, archivedTasks: ITask[]){
    let plantsInArchived = this.initialisePlantsInTasks(plant, archivedTasks);

    plantsInArchived.forEach((task)=>{
      if(Math.max(this.calculateProductivityWeightBySeed(plant, archivedTasks))){
        this.startingDateForBestProductivity = task.startingDate;
      };
    });
  }

   calculateProductivityPerPlantPerTask(archivedTasks: ITask[]): number[]{
    let productivityOfAllPlants: number[] = []
    let productivityPerPlant= 0

    archivedTasks.forEach((task)=>{
      let totalWeight = 0;
      let totalSeeds = 0;
      if(task.harvestedWeight){
        totalWeight += task.harvestedWeight.split(',').map(Number).reduce((sum, current) => sum + current, 0);
      }
      totalSeeds += task.seedsUsed;

      productivityPerPlant = Math.round(totalWeight/totalSeeds);

      productivityOfAllPlants.push(productivityPerPlant);
    });

    return productivityOfAllPlants;
  }

  getBestCompanionPlants(plant: IPlantsList, archivedTasks: ITask[]){
    let tasksDoneTogether: ITask[] =[];
    this.bestCompanionPlants = [];
    let mostProductiveTask = this.getPlantWithHightestProductivity(plant, archivedTasks);

    archivedTasks.forEach((task)=>{
      if (task.patchId === mostProductiveTask.patchId && task !== mostProductiveTask){
          if(this.calculateIfGrownTogether(task, mostProductiveTask)){
            tasksDoneTogether.push(task);
          }
        }});

      this.orderMostProductiveTasks(tasksDoneTogether);
      this.getFirstThreeMostProductiveTasks(tasksDoneTogether);
      this.setUpBestCompanionPlantsById(tasksDoneTogether);
  }

  private setUpBestCompanionPlantsById(tasksDoneTogether: ITask[]){
    tasksDoneTogether.forEach((task)=>{
      this.bestCompanionPlants.push(task.plantId);
    })
  }

  private getFirstThreeMostProductiveTasks(tasksDoneTogether: ITask[]){
    tasksDoneTogether.slice(0,3);
  }

  private orderMostProductiveTasks(tasksDoneTogether: ITask[]){
    tasksDoneTogether.sort((taskA,taskB)=> {
      return taskA.productivity - taskB.productivity;
    })
  }

  private getDifferenceBetweenStartingAndHarvestingDates(taskStartingDateInSoil:string, mostProductiveTaskStartingDateInSoil: string, taskLastHarvest:string, mostProductiveTaskLastHarvest:string){
    let numberOfDaysWhenStarting= 0;
    let numberOfDaysWhenHarvesting= 0;

    let taskTransplantDate = new Date(taskStartingDateInSoil);
    let mostProductiveTaskTransplantDate = new Date(mostProductiveTaskStartingDateInSoil);

    let harvestedDatesForTask = taskLastHarvest.split(',');
    let harvestedDatesForMostProductiveTask = mostProductiveTaskLastHarvest.split(',');
    let taskHarvestedDate = new Date(harvestedDatesForTask[harvestedDatesForTask.length -1]);
    let mostProductiveTaskHarvestedDate = new Date(harvestedDatesForMostProductiveTask[harvestedDatesForMostProductiveTask.length -1]);

    numberOfDaysWhenStarting = this.calculateDifferenceBetweenTwoDates(taskTransplantDate, mostProductiveTaskTransplantDate);
    numberOfDaysWhenHarvesting = this.calculateDifferenceBetweenTwoDates(taskHarvestedDate, mostProductiveTaskHarvestedDate);

    return (numberOfDaysWhenHarvesting >= -30 && numberOfDaysWhenHarvesting <=30) || (numberOfDaysWhenStarting >= -30 && numberOfDaysWhenStarting <=30)
  }

  private calculateIfGrownTogether(task: ITask, mostProductiveTask: ITask): boolean{

    if(task.transplantDate && mostProductiveTask.transplantDate &&
      task.realHarvestingDates && mostProductiveTask.realHarvestingDates){
      return this.getDifferenceBetweenStartingAndHarvestingDates(task.transplantDate, mostProductiveTask.transplantDate, task.realHarvestingDates, mostProductiveTask.realHarvestingDates);
    }

    else if(task.startingDate && mostProductiveTask.transplantDate &&
      task.realHarvestingDates && mostProductiveTask.realHarvestingDates){
      return this.getDifferenceBetweenStartingAndHarvestingDates(task.startingDate, mostProductiveTask.transplantDate, task.realHarvestingDates, mostProductiveTask.realHarvestingDates);
    }

    else if(task.transplantDate && mostProductiveTask.startingDate &&
      task.realHarvestingDates && mostProductiveTask.realHarvestingDates){
      return this.getDifferenceBetweenStartingAndHarvestingDates(task.transplantDate, mostProductiveTask.startingDate, task.realHarvestingDates, mostProductiveTask.realHarvestingDates);
    }

    else if(task.startingDate && mostProductiveTask.startingDate &&
      task.realHarvestingDates && mostProductiveTask.realHarvestingDates){
      return this.getDifferenceBetweenStartingAndHarvestingDates(task.startingDate, mostProductiveTask.startingDate, task.realHarvestingDates, mostProductiveTask.realHarvestingDates);
    }

    return false;
}

  private getPlantWithHightestProductivity(plant: IPlantsList, archivedTasks: ITask[]): ITask{
    let plantsInArchived = this.initialisePlantsInTasks(plant, archivedTasks);
    let mostProductiveTask= plantsInArchived.reduce((task1, task2) => task1.productivity < task2.productivity ? task2 : task1);
    return mostProductiveTask;
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


