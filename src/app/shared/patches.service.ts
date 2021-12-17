import { ContentObserver } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlantsList } from '../garden-list/models/iplants-model';
import { IPatch } from '../garden/models/ipatch-model';
import { ITask } from '../task/models/itask-model';
import * as patches from "./patch-list.json";
import * as moment from 'moment';
import { AllTasksComponent } from '../task/all-tasks/all-tasks.component';
import { PlantsListComponent } from '../garden-list/plants-list.component';


@Injectable()
export class PatchesService {
  patch!: IPatch;

  static PATCHES: any = [];

  today = new Date();
  nextDate!: any;
  todayDate!: any;
  diffInDays!: number;

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
        this.givesNextTask(task);
        this.calculateNextDate(task);
        patch.tasklist.push(task);
      }
      newPatches.push(patch);

    }
    this.PATCHES = newPatches;
    console.log(this.PATCHES);
  }

  givesNextTask(task: ITask) {
    if (task.action == 'Sowing in pots') {
      task.nextTask = 'Planting';
    }
    else {
      task.nextTask = 'Harvesting';
    }
  }

  getAllTasks() {
    var allTasks: ITask[] = [];
    for (let patch of this.PATCHES) {
      if (patch.tasklist?.length) {
        for (let task of patch.tasklist) {
          allTasks.push(task);
          this.getDifferenceBetweenTaskDateAndTodaydate(patch.name);
        }
      }
    }
    return allTasks;
  }

  getDifferenceBetweenTaskDateAndTodaydate(patchName: string) {
    for (let patch of this.PATCHES) {
      if (patch.name == patchName) {
        for (let task of patch.tasklist) {
          this.nextDate = moment(task.nextDate.toString().substring(0,10));
          this.todayDate = moment(this.today.toString().substring(0,10));
          this.diffInDays = Math.ceil(this.nextDate.diff(this.todayDate, 'days'));
          task.daysDifferenceBetweenTaskAndToday = this.diffInDays;
          console.log(`the difference between planting and sowing dates ${this.diffInDays} for ${task.name}`);

        }
      }
    }
    return this.diffInDays;
  }


  calculateNextDate(task: ITask) {
    var startDate = task.startingDate;
    var numberOfDaysToAdd: number;
    var harvestingFirstMonth: number;

    switch (task.plant.startingMethod) {
      case ('Sowing in pots'):
        numberOfDaysToAdd = Number(task.plant.sowingPeriodInDays);
        this.calculateDate(task, startDate, numberOfDaysToAdd);
        break;

      case ('Sowing in soil'):
        numberOfDaysToAdd = Number(task.plant.harvestingPeriodInDays);
        this.calculateDate(task, startDate, numberOfDaysToAdd);
        break;

      case ('Planting'):
        //hardcoded
        harvestingFirstMonth = Number("9");
        // harvestingLastMonth = task.plant.harvestingMonths[task.plant.harvestingMonths.length - 1];
        this.getFirstDayOfFirstHarvestingMonth(task, startDate, harvestingFirstMonth);
        break;
    }

  }

  calculateDate(task: ITask, startDate: Date, numberOfDays: number) {
    var nextDateForTask;
    var isoTime;

    isoTime = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    nextDateForTask = new Date(isoTime);
    nextDateForTask.setDate(nextDateForTask.getDate() + numberOfDays);
    task.nextDate = nextDateForTask;
  }

  getFirstDayOfFirstHarvestingMonth(task: ITask, startDate: Date, harvestingFirstMonth: number) {
    var nextDateForTask;

    if (startDate.getMonth() < harvestingFirstMonth) {
      nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
      console.log("Current date:", nextDateForTask);
      nextDateForTask.setMonth(nextDateForTask.getMonth() + harvestingFirstMonth);
      console.log("Date after " + harvestingFirstMonth + " months:", nextDateForTask);
    }
  }

  PATCHES = (patches as any).default;
}


