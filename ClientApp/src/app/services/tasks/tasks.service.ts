import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITaskInPatch } from 'src/app/garden/models/itaskinpatch-models';
import { ITask } from 'src/app/task/models/itask-model';
import { IPlantsInTasks } from '../../task/models/IPlantsInTasks-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = 'https://localhost:5001/Tasks/';
  allHarvestedDates: string[] = [];
  allHarvestedWeight: string[] = [];


  constructor(private http: HttpClient) { }

  saveNewTask(task: ITask): Observable<ITask>{
    task.startingDate = task.startingDate.toString();
    task.nextTask = this.givesFirstNextTask(task);
    task.nextDate = this.calculateNextDate(task).toString();

    console.log(`Setting the ${task.currentTask} from the task service`);
    return this.http.post<ITask>(this.baseUrl + 'save-task', task).pipe(
      tap(() => console.log(`Task service added ${task.currentTask} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveTaskInPatch(patchName: string, patchId: number): Observable<ITaskInPatch> {
    var taskInPatch: ITaskInPatch = {patchId: 0, patchName: '', taskId: 0};
    taskInPatch.patchName = patchName;
    taskInPatch.patchId = patchId;

    return this.http.post<ITaskInPatch>(this.baseUrl + 'save-task-in-patch', taskInPatch ).pipe(
      tap(() => console.log(`Task service added ${taskInPatch.taskId} to ${taskInPatch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  savePlantInTask(plantId: number): Observable<IPlantsInTasks> {
    var plantInTask: IPlantsInTasks = { taskId: 0, plantId: 0 };
    plantInTask.plantId = plantId;

    return this.http.post<IPlantsInTasks>(this.baseUrl + 'save-plant-in-task', plantInTask).pipe(
      tap(() => console.log(`Task service added ${plantInTask.plantId} to task successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveFailedTask(task: ITask) {
    this.saveFailureReasons(task).subscribe();
    this.saveTaskInArchiveTasks(task).subscribe();
    this.deleteTask(task.taskId).subscribe();
  }

  saveFailureReasons(task: ITask): Observable<ITask>{
    return this.http.put<ITask>(this.baseUrl + 'save-task-failure-reasons', task).pipe(
      tap(() => console.log(`Task service added ${task.failureReasons} to ${task.taskId} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveTaskInArchiveTasks(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.baseUrl + 'save-task-in-archived-tasks', task).pipe(
      tap(() => console.log(`Task service added ${task.taskId} to archived tasks successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  saveTransplantedTask(task: ITask): Observable<ITask>{
    task.currentTask = 'Planting';
    task.nextTask = this.givesFirstNextTask(task);
    task.nextDate = this.calculateNextDate(task).toString();

    return this.http.put<ITask>(this.baseUrl + 'save-transplanted-task', task).pipe(
      tap(() => console.log(`Task service updated ${task.taskId} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteTask(taskId: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('taskId', taskId);

    console.log(`Deleting the ${taskId} from the task service`);
    return this.http.delete<number>(this.baseUrl + 'delete-task', { params: params }).pipe(
      tap(() => console.log(`Task service deleted ${taskId} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  saveUnfinishedHarvestedTask(task: ITask) {
    if (task.harvestedWeight) {
      this.allHarvestedWeight.push(task.harvestedWeight);
      task.harvestedWeight = this.allHarvestedWeight.toString() ;
    }
 
    if (task.realHarvestingDates) {
      this.allHarvestedDates.push(task.realHarvestingDates);
      task.realHarvestingDates = this.allHarvestedDates.toString();
    }
    this.saveHarvestedTask(task).subscribe();
  }

  saveFinishedHarvestedTask(task: ITask) {
    if (task.harvestedWeight) {
      this.allHarvestedWeight.push(task.harvestedWeight);
      task.harvestedWeight = this.allHarvestedWeight.toString();
    }

    if (task.realHarvestingDates) {
      this.allHarvestedDates.push(task.realHarvestingDates);
      task.realHarvestingDates = this.allHarvestedDates.toString();
    }

    this.saveHarvestedTask(task).subscribe();
    this.saveTaskInArchiveTasks(task).subscribe();
    this.deleteTask(task.taskId).subscribe();
  }

  saveHarvestedTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.baseUrl + 'save-harvested-task', task).pipe(
      tap(() => console.log(`Task service updated ${task.taskId} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getDifferenceBetweenTaskDateAndTodaydate(taskList: ITask[]): number {
    var nextDate: any;
    var todayDate: any;
    var daysBeforeTask = 0;

    for (let task of taskList) {
      let taskNextDate = new Date(task.nextDate);
      let today = new Date();

      nextDate = moment(taskNextDate.toString().substring(0, 15));
      todayDate = moment(today.toString().substring(0, 15));
      task.daysDifferenceBetweenTaskAndToday = Math.ceil(nextDate.diff(todayDate, 'days'));
      daysBeforeTask = task.daysDifferenceBetweenTaskAndToday;
    }
    return daysBeforeTask;
  }

  sortTasksByEarliestDate(taskList: ITask[]) {
    taskList.sort((task1: ITask, task2: ITask) => {
      if (task1.daysDifferenceBetweenTaskAndToday > task2.daysDifferenceBetweenTaskAndToday) {
        return 1;
      }

      if (task1.daysDifferenceBetweenTaskAndToday < task2.daysDifferenceBetweenTaskAndToday) {
        return -1;
      }

      return 0;
    })
  }

  private givesFirstNextTask(task: ITask) {
    if (task.currentTask == 'Sowing in pots') {
      return 'Planting';
    }
      return 'Harvesting';
  }

  private calculateNextDate(task: ITask): Date {
    var nextDate = new Date();
    var startDate = new Date(task.startingDate);
    var numberOfDaysToAdd: number;
    var harvestingFirstMonth: number;

    switch (task.plant.plantStartingMethod) {
      case ('Sowing in pots'):
        if (task.transplantDate) {
          var transplantDate = new Date(task.transplantDate);
          numberOfDaysToAdd = Number(task.plant.plantGrowingPeriod);
          nextDate = this.calculateDate(transplantDate, numberOfDaysToAdd);
          break;
        }
        numberOfDaysToAdd = Number(task.plant.plantSowingPeriod);
        nextDate = this.calculateDate(startDate, numberOfDaysToAdd);
        break;

      case ('Sowing in soil'):
        numberOfDaysToAdd = Number(task.plant.plantGrowingPeriod);
        nextDate =this.calculateDate(startDate, numberOfDaysToAdd);
        break;

      case ('Planting'):
        var firstMonth = task.plant.plantHarvestingMonths[0];
        var harvestingFirstMonth: number = this.givesMonthANumber(firstMonth);
        nextDate = this.getFirstDayOfFirstHarvestingMonth(startDate, harvestingFirstMonth);
        break;
    }
    return nextDate;
  }

    private calculateDate(date: Date, numberOfDays: number) {
      var nextDateForTask;
      var isoTime;

      isoTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      nextDateForTask = new Date(isoTime);
      nextDateForTask.setDate(nextDateForTask.getDate() + numberOfDays);
      return nextDateForTask;
    }

    private getFirstDayOfFirstHarvestingMonth(startDate: Date, harvestingFirstMonth: number): Date {
      var nextDateForTask= new Date;

      if (startDate.getMonth() < harvestingFirstMonth) {
        nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        nextDateForTask.setMonth(nextDateForTask.getMonth() - nextDateForTask.getMonth() + harvestingFirstMonth - 1);
        nextDateForTask.setDate(nextDateForTask.getDate() - nextDateForTask.getDate() + 1);

      }
      else if (startDate.getMonth() >= harvestingFirstMonth) {
        nextDateForTask = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        nextDateForTask.setFullYear(nextDateForTask.getFullYear() + 1);
        nextDateForTask.setMonth(nextDateForTask.getMonth() - nextDateForTask.getMonth() + harvestingFirstMonth - 1);
        nextDateForTask.setDate(nextDateForTask.getDate() - nextDateForTask.getDate() + 1);
      }

      nextDateForTask.toString();
      return nextDateForTask;
    }

    private givesMonthANumber(firstMonth: string){
      switch (firstMonth) {
        case ('January'):
          return 1;
        case ('February'):
          return 2;
        case ('March'):
          return 3;
        case ('April'):
          return 4;
        case ('May'):
          return 5;
        case ('June'):
          return 6;
        case ('July'):
          return 7;
        case ('August'):
          return 8;
        case ('September'):
          return 9;
        case ('October'):
          return 10;
        case ('November'):
          return 11;
        case ('December'):
          return 12;
      }
      return 0;
  }


}
