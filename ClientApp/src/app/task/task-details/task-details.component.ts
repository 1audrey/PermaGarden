import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { TasksService } from '../../services/tasks/tasks.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit, OnChanges {
  @Input() patchWithoutParams!: IPatch;
  @Input() patchFromHomepage: boolean = false;
  @Input() selectedFilter!: string;
  patchName!: string;
  patchId!: number;
  patch!: IPatch;
  taskList: ITask[] = [];
  daysDifferenceBetweenTaskAndToday!: number;
  params: any;
  plants: IPlantsList[] = [];

  constructor(private route: ActivatedRoute,
    private taskService: TasksService,
    public dialog: MatDialog,
    private router: Router,
    private notifications: NotificationsService,  ) { }

  ngOnInit() {
    this.params = this.route.snapshot.params['patchName'];

    if (this.params) {
      this.route.data.forEach((data) => {
        this.patch = data['patchName'][0];
        if (this.patch.taskList && this.patch.plantList) {
          this.taskList = this.patch.taskList;
          this.patchName = this.patch.patchName;
          this.patchId = this.patch.patchId;
          this.plants = this.patch.plantList;
        }
      });
    }

    else if (this.patchWithoutParams.taskList && this.patchWithoutParams.plantList) {
      this.taskList = this.patchWithoutParams.taskList;
      this.patchName = this.patchWithoutParams.patchName;
      this.patchId = this.patchWithoutParams.patchId;
      this.plants = this.patchWithoutParams.plantList;
      }

    this.getDifferenceBetweenTaskDateAndTodaydate(this.taskList);
    this.sortTasksByEarliestDate(this.taskList);
    this.keepSixTasksOnly(this.taskList);
  }

  ngOnChanges(changes: SimpleChanges) {
    var filteredTasks: ITask[] = [];

    if (changes['selectedFilter'] && changes['selectedFilter']?.previousValue != changes['selectedFilter']?.currentValue) {

      this.ngOnInit();

      for (let task of this.taskList) {

        switch (this.selectedFilter) {
          case 'Late':
            if (this.isTaskLate(task)) {
              filteredTasks.push(task);
            }
            break;

          case 'Today':
            if (this.isTaskToday(task)) {
              filteredTasks.push(task);
            }
            break;

          case 'In the Week':
            if (this.isTaskThisWeek(task)) {
              filteredTasks.push(task);
            }
            break;

          case 'Coming':
            if (this.isTaskComing(task)) {
              filteredTasks.push(task);
            }
            break;

          default:
            filteredTasks.push(task);
            break;
        }
      }
      this.taskList = filteredTasks;
    }
  }

  openTask(task: ITask) {
      const dialogRef = this.dialog.open(CompleteTaskDialogComponent, {
        width: '50%',
        data: {
          taskId: task.taskId,
          seedsUsed: task.seedsUsed,
          currentTask: task.currentTask,
          plantId: task.plantId,
          patchId: this.patchId,
          nextDate: task.nextDate,
          nextTask: task.nextTask,
          startingDate: task.startingDate,
          transplantDate: task.transplantDate,
          daysDifferenceBetweenTaskAndToday: task.daysDifferenceBetweenTaskAndToday,
          realHarvestingDates: task.realHarvestingDates,
          harvestedWeight: task.harvestedWeight,
          failureReasons: task.failureReasons,
        },
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe(updatedTask => {
        if (updatedTask.failureReasons != null) {
          this.deleteTask(updatedTask.taskId);
          this.taskService.saveFailedTask(updatedTask);
        }
        else if (updatedTask.harvestSelectedAnswer) {
          this.verifyHarvestedAnswer(updatedTask);
        }
        else if (updatedTask.transplantDate != null) {
          let plantInTask = this.getPlantFromTask(updatedTask.plantId);
          this.taskService.saveTransplantedTask(updatedTask, plantInTask).subscribe(() => {
          this.reloadPage();
          });
        }
      });
  }

  deleteTask(taskId: number) {
    var index = this.taskList.findIndex((deletedTask) => (deletedTask.taskId === taskId));
    if (index != -1) {
      this.taskList.splice(index, 1);
    }
    this.taskService.taskToDelete(taskId);
  }

  getDifferenceBetweenTaskDateAndTodaydate(taskList: ITask[]) {
    this.taskService.getDifferenceBetweenTaskDateAndTodaydate(taskList);
   }

  sortTasksByEarliestDate(taskList: ITask[]) {
    this.taskService.sortTasksByEarliestDate(taskList);
  }

  isTaskLate(task: ITask): boolean {
    return task.daysDifferenceBetweenTaskAndToday < 0;
  }

  isTaskToday(task: ITask): boolean {
    return task.daysDifferenceBetweenTaskAndToday === 0;
  }

  isTaskThisWeek(task: ITask): boolean {
    return task.daysDifferenceBetweenTaskAndToday >= 1 && task.daysDifferenceBetweenTaskAndToday <= 7;
  }

  isTaskComing(task: ITask): boolean {
    return task.daysDifferenceBetweenTaskAndToday >= 8;
  }

  getPlantName(plantId: number): string{
    let plantInTask = '';
    this.plants.forEach((plant)=>{
      if(plant.plantId == plantId){
        plantInTask = plant.plantName;
        return plantInTask;
      }
      return plantInTask;
    });
    return plantInTask;
  }

  getPlantFromTask(plantId: number): IPlantsList{
    let plantInTask: IPlantsList = {
      plantId: 0,
      plantName: '',
      plantStartingMonths: '',
      plantStartingMethod: '',
      plantSowingPeriod: 0,
      plantHarvestingMonths: '',
      plantGrowingPeriod: 0,
      plantImagePicture: '',
    };

    this.plants.forEach((plant)=>{
      if(plant.plantId == plantId){
        plantInTask = plant;
        return plantInTask;
      }
      return plantInTask;
    });
    return plantInTask;
  }

  getPlantPicture(plantId: number): string{
    let plantPicture = '';
    this.plants.forEach((plant)=>{
      if(plant.plantId == plantId){
        plantPicture = plant.plantImagePicture;
        return plantPicture;
      }
      return plantPicture;
    });
    return plantPicture;
  }

  private keepSixTasksOnly(taskList: ITask[]) {
    if (this.patchFromHomepage) {
      this.taskList = taskList.slice(0, 6);
    }
  }

  private verifyHarvestedAnswer(updatedTask: any) {
    if(updatedTask.harvestSelectedAnswer !== 'No'){
      this.taskService.saveFinishedHarvestedTask(updatedTask);
      this.deleteTask(updatedTask.taskId);
    }
    else{
      this.taskService.saveUnfinishedHarvestedTask(updatedTask);
      this.reloadPage();
    }
  }

  private reloadPage(){
    if (this.params) {
      this.router.navigate(['/tasks', this.params]);
      this.notifications.showSuccess(`The task has been successfully updated`);
      this.ngOnInit();
    }
    else if(this.patchFromHomepage){
      this.router.navigate(['/home']);
      this.notifications.showSuccess(`The task has been successfully updated`);
      this.ngOnInit();
    }
    else {
      this.router.navigate(['/tasks']);
      this.notifications.showSuccess(`The task has been successfully updated`);
      this.ngOnInit();

    }
  }
}
