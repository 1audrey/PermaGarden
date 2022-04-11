import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
