import { ContentObserver } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlantsList } from '../garden-list/models/iplants-model';
import { IPatch } from '../garden/models/ipatch-model';
import { ITask } from '../task/models/itask-model';
import * as patches from "./patch-list.json";


@Injectable()
export class PatchesService {
  patch!: IPatch;
  static PATCHES: any = [];
  constructor() { }

  getPatch(): Observable<IPatch[]> {
    let subject = new Subject<IPatch[]>()
    setTimeout(() => { subject.next(this.PATCHES); subject.complete(); },
      100)

    return subject;
  }

  getSinglePatch(patchName: string) {
    return this.PATCHES.find((patch: { name: string; }) => patch.name === patchName)
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
        this.calculateNextDate(patch, task);
        patch.tasklist.push(task);
      }
      newPatches.push(patch);

    }
    this.PATCHES = newPatches;
    console.log(this.PATCHES);
  }

  givesNextTask(task: ITask) {
    if (task.action == 'Sowing in pots' || task.action == 'Sowing in soil') {
      task.nextTask = 'Planting';
    }
    else {
      task.nextTask = 'Harvesting';
    }
  }

  calculateNextDate(patch: IPatch, task: ITask) {
    var startDate = task.startingDate;
    var numberOfDaysToAdd = 0;
    var nextDate;
    var isoTime;

    if (patch.plantlist) {
      for (let plant of patch.plantlist) {
        if (plant.sowingPeriodInDays) {
          numberOfDaysToAdd = plant.sowingPeriodInDays;
          isoTime = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
          nextDate = new Date(isoTime);
          nextDate.setDate(nextDate.getDate() + numberOfDaysToAdd);
          task.nextDate = nextDate
        }
      }
    }
  };

  PATCHES = (patches as any).default;
}


