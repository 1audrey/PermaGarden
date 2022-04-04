import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import * as patches from "./patch-list.json";
import * as moment from 'moment';
import { IPatch } from '../../garden/models/ipatch-model';
import { ITask } from '../../task/models/itask-model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPlantInPatch } from '../../garden/models/iplantinpatch-model';

@Injectable()
export class PatchesService {
  baseUrl = 'https://localhost:5001/Patches/';

  patch!: IPatch;
  static PATCHES: any = [];
  today = new Date();
  nextDate!: any;
  todayDate!: any;
  diffInDays!: number;
  nextTaskEvent!: false;
  allTasks!: ITask[];


  constructor(private http: HttpClient) { }

  getASinglePatch(patchName: string): Observable<IPatch[]> {
    this.getDifferenceBetweenTaskDateAndTodaydate(patchName);
    return this.http.get<IPatch[]>(this.baseUrl + `${patchName}`);
  }

  getAllPatches(): Observable<IPatch[]> {
    return this.http.get<IPatch[]>(this.baseUrl + 'all-patches');
  }

  saveNewPatch(patch: IPatch): Observable<IPatch> {
    console.log(`Setting the ${patch.patchName} from the patch service`);
    return this.http.post<IPatch>(this.baseUrl + 'save-patch', patch).pipe(
      tap(() => console.log(`Patch service added ${patch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editPatch(patch: IPatch): Observable<IPatch> {
    console.log(`Editing the ${patch.patchName} from the patch service`);
    return this.http.put<IPatch>(this.baseUrl + 'edit-patch', patch).pipe(
      tap(() => console.log(`Patch service edited ${patch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  patchToDelete(patchName: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('patchName', patchName);

    console.log(`Deleting the ${patchName} from the patch service`);
    return this.http.delete<string>(this.baseUrl + 'delete-patch', { params: params }).pipe(
      tap(() => console.log(`Patch service deleted ${patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  savePlantInPatch(plantInPatch: IPlantInPatch): Observable<IPlantInPatch> {
    console.log(`Setting the ${plantInPatch.plantId} from the patch service`);
    return this.http.post<IPlantInPatch>(this.baseUrl + 'save-plant-in-patch', plantInPatch ).pipe(
      tap(() => console.log(`Patch service added ${plantInPatch.plantId} to ${plantInPatch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deletePlantInPatch(plantId: number, patchId: number): Observable<any> {
    console.log(`Deleting the ${plantId} from the patch service`);
    return this.http.delete<any>(this.baseUrl + 'delete-plant-in-patch', { params: { plantId: plantId, patchId: patchId } }).pipe(
      tap(() => console.log(`Patch service deleted ${plantId} from ${patchId} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  saveTaskInPatch(task: ITask) {
    var newPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === task.patchName) {
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
    if (task.currentTask == 'Sowing in pots') {
      task.nextTask = 'Planting';
    }
    else {
      task.nextTask = 'Harvesting';
    }
  }

  givesSecondNextTask(task: ITask) {
    if (task.currentTask == 'Sowing in pots') {
      task.currentTask = 'Planting'
      task.nextTask = 'Harvesting';
    }
  }

  getAllTasks() {
    var allTasks: ITask[] = [];
    for (let patch of this.PATCHES) {
      if (patch.taskList?.length) {
        for (let task of patch.taskList) {
          this.getDifferenceBetweenTaskDateAndTodaydate(patch.patchName);
          allTasks.push(task);

        }
      }
    }
    return allTasks;
  }

  getDifferenceBetweenTaskDateAndTodaydate(patchName: string) {
    for (let patch of this.PATCHES) {
      if (patch.patchName == patchName) {
        for (let task of patch.taskList) {
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
    var startDate = new Date(task.startingDate);
    var numberOfDaysToAdd: number;
    var harvestingFirstMonth: number;

    switch (task.plant.plantStartingMethod) {
      case ('Sowing in pots'):
        numberOfDaysToAdd = Number(task.plant.plantGrowingPeriod);
        this.calculateDate(task, startDate, numberOfDaysToAdd);
        break;

      case ('Sowing in soil'):
        numberOfDaysToAdd = Number(task.plant.plantGrowingPeriod);
        this.calculateDate(task, startDate, numberOfDaysToAdd);
        break;

      case ('Planting'):
        var firstMonth = task.plant.plantHarvestingMonths[0];
        var harvestingFirstMonth: number  = this.givesMonthANumber(firstMonth);
        // harvestingLastMonth = task.plant.plantHarvestingMonths[task.plant.plantHarvestingMonths.length - 1];
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
    task.nextDate = nextDateForTask.toString();
  }

  getFirstDayOfFirstHarvestingMonth(task: ITask, startDate: Date, harvestingFirstMonth: number) {
    var nextDateForTask;

    if (startDate.getMonth() < harvestingFirstMonth) {
      nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

      nextDateForTask.setMonth(nextDateForTask.getMonth() - nextDateForTask.getMonth() + harvestingFirstMonth -1);
      nextDateForTask.setDate(nextDateForTask.getDate() - nextDateForTask.getDate() + 1);

      task.nextDate = nextDateForTask.toString();
    }
    else if(startDate.getMonth() >= harvestingFirstMonth){
      nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

      nextDateForTask.setFullYear(nextDateForTask.getFullYear() + 1);
      nextDateForTask.setMonth(nextDateForTask.getMonth() - nextDateForTask.getMonth() + harvestingFirstMonth - 1);
      nextDateForTask.setDate(nextDateForTask.getDate() - nextDateForTask.getDate() + 1);
      console.log(nextDateForTask);

      task.nextDate = nextDateForTask.toString();
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


