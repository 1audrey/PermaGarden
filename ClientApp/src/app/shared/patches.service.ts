import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlantsList } from '../garden-list/models/iplants-model';
import { IPatch } from '../garden/models/ipatch-model';
import { ITask } from '../task/models/itask-model';
import * as patches from "./patch-list.json";
import * as moment from 'moment';

@Injectable()
export class PatchesService {
  patch!: IPatch;


  static PATCHES: any = [];

  today = new Date();
  nextDate!: any;
  todayDate!: any;
  diffInDays!: number;
  nextTaskEvent!: false;
  allTasks!: ITask[];


  constructor() { }

  getPatch(): Observable<IPatch[]> {
    let subject = new Subject<IPatch[]>()
    setTimeout(() => { subject.next(this.PATCHES); subject.complete(); },
      100)

    return subject;
  }

  getSinglePatch(patchName: string) {
    this.getDifferenceBetweenTaskDateAndTodaydate(patchName);
    return this.PATCHES.find((patch: { name: string; }) => patch.name === patchName);
  }

  savePlantInPatch(patchName: string, plant: IPlantsList) {
    var newPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === patchName) {
        patch.plantlist.push(plant);
      }
      newPatches.push(patch);
    }
    this.PATCHES = newPatches;

  }

  savePatch(newPatch: IPatch) {
    this.PATCHES.push(newPatch)
    console.log(newPatch);
  }

  saveTaskInPatch(patchName: string, task: ITask) {
    var newPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === patchName) {
        this.givesFirstNextTask(task);
        this.calculateNextDate(task);
        patch.tasklist.push(task);
      }
      newPatches.push(patch);

    }
    this.PATCHES = newPatches;
    console.log(this.PATCHES);
  }

  givesFirstNextTask(task: ITask) {
    if (task.action == 'Sowing in pots') {
      task.nextTask = 'Planting';
    }
    else {
      task.nextTask = 'Harvesting';
    }
  }

  givesSecondNextTask(task: ITask) {
    if (task.action == 'Sowing in pots') {
      task.action = 'Planting'
      task.nextTask = 'Harvesting';
    }
  }

  getAllTasks() {
    var allTasks: ITask[] = [];
    for (let patch of this.PATCHES) {
      if (patch.tasklist?.length) {
        for (let task of patch.tasklist) {
          this.getDifferenceBetweenTaskDateAndTodaydate(patch.name);
          allTasks.push(task);

        }
      }
    }
    return allTasks;
  }

  getDifferenceBetweenTaskDateAndTodaydate(patchName: string) {
    for (let patch of this.PATCHES) {
      if (patch.name == patchName) {
        for (let task of patch.tasklist) {
          this.nextDate = moment(task.nextDate.toString().substring(0,15));
          this.todayDate = moment(this.today.toString().substring(0,15));
          this.diffInDays = Math.ceil(this.nextDate.diff(this.todayDate, 'days'));
          task.daysDifferenceBetweenTaskAndToday = this.diffInDays;
          console.log(`the difference between planting and sowing dates ${this.diffInDays} for ${task.patchName}`);

        }
      }
    }
    return this.diffInDays;
  }


  calculateNextDate(task: ITask) {
    var startDate = task.startingDate;
    var transplantDate = task.transplantDate;
    var numberOfDaysToAdd: number;
    var harvestingFirstMonth: number;

    switch (task.plant.startingMethod) {
      case ('Sowing in pots'):
        numberOfDaysToAdd = Number(task.plant.sowingPeriodInDays);
        if(transplantDate === undefined){
        this.calculateDate(task, startDate, numberOfDaysToAdd);
        break;
        }
        numberOfDaysToAdd = Number(task.plant.harvestingPeriodInDays);
        this.calculateDate(task, transplantDate, numberOfDaysToAdd);
        break;

      case ('Sowing in soil'):
        numberOfDaysToAdd = Number(task.plant.harvestingPeriodInDays);
        this.calculateDate(task, startDate, numberOfDaysToAdd);
        break;

      case ('Planting'):
        var firstMonth = task.plant.harvestingMonths[0];
        var harvestingFirstMonth: number  = this.givesMonthANumber(firstMonth);
        // harvestingLastMonth = task.plant.harvestingMonths[task.plant.harvestingMonths.length - 1];
        this.getFirstDayOfFirstHarvestingMonth(task, startDate, harvestingFirstMonth);
        break;
    }

  }

  calculateDate(task: ITask, date: Date, numberOfDays: number) {
    var nextDateForTask;
    var isoTime;

    isoTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    nextDateForTask = new Date(isoTime);
    nextDateForTask.setDate(nextDateForTask.getDate() + numberOfDays);
    task.nextDate = nextDateForTask;
  }

  getFirstDayOfFirstHarvestingMonth(task: ITask, startDate: Date, harvestingFirstMonth: number) {
    var nextDateForTask;

    if (startDate.getMonth() < harvestingFirstMonth) {
      nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

      nextDateForTask.setMonth(nextDateForTask.getMonth() - nextDateForTask.getMonth() + harvestingFirstMonth -1);
      nextDateForTask.setDate(nextDateForTask.getDate() - nextDateForTask.getDate() + 1);

      task.nextDate = nextDateForTask;
    }
    else if(startDate.getMonth() >= harvestingFirstMonth){
      nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

      nextDateForTask.setFullYear(nextDateForTask.getFullYear() + 1);
      nextDateForTask.setMonth(nextDateForTask.getMonth() - nextDateForTask.getMonth() + harvestingFirstMonth - 1);
      nextDateForTask.setDate(nextDateForTask.getDate() - nextDateForTask.getDate() + 1);
      console.log(nextDateForTask);

      task.nextDate = nextDateForTask;
    }
  }

  givesMonthANumber(firstMonth: string){
    switch(firstMonth){
      case('January'):
      return 1;
      case('February'):
      return 2;
      case('March'):
      return 3;
      case('April'):
      return 4;
      case('May'):
      return 5;
      case('June'):
      return 6;
      case('July'):
      return 7;
      case('August'):
      return 8;
      case('September'):
      return 9;
      case('October'):
      return 10;
      case('November'):
      return 11;
      case('December'):
      return 12;
    }
    return 0;
  }

  saveNextTaskInPatch(task: ITask) {
    var newPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === task.patchName ) {
        this.givesSecondNextTask(task);
        this.calculateNextDate(task);
        patch.tasklist.push(task);

      }
      newPatches.push(patch);
      this.getDifferenceBetweenTaskDateAndTodaydate(patch.name);

    }
    this.PATCHES = newPatches;
  }

  saveFailedTaskInPatch(task: ITask){
    var newFailedPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === task.patchName ) {
        patch.tasklist.push(task);
      }
      newFailedPatches.push(patch);
    }
    this.PATCHES = newFailedPatches;
  }

  saveHarvestedTaskInPatch(form: any){
    var newHarvestedPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === form.patchName ) {
        patch.tasklist.push(form);
        console.log(patch);
      }
      newHarvestedPatches.push(patch);
    }
    this.PATCHES = newHarvestedPatches;
  }


  PATCHES = (patches as any).default;
}


