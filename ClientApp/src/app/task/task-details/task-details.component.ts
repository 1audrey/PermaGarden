import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { TasksService } from '../../services/tasks/tasks.service';
import { PatchesService } from '../../services/patches/patches.service';

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
  patch!: IPatch;
  taskList: ITask[] = [];
  daysDifferenceBetweenTaskAndToday!: number;

  constructor(private route: ActivatedRoute,
    private taskService: TasksService,
    public dialog: MatDialog) { }

  ngOnInit() {
    var params = this.route.snapshot.params['patchName'];

    if (params) {
      this.route.data.forEach((data) => {
        this.patch = data['patchName'][0];
        if (this.patch.taskList) {
          this.taskList = this.patch.taskList;
          this.patchName = this.patch.patchName;
        }
      });
    }

    else if (this.patchWithoutParams.taskList) {
      this.taskList = this.patchWithoutParams.taskList;
      this.patchName = this.patchWithoutParams.patchName;
      }

    this.getDifferenceBetweenTaskDateAndTodaydate(this.taskList);
    this.sortTasksByEarliestDate(this.taskList);
    this.keepFourTasksOnly(this.taskList);

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
          currentTask: task.currentTask,
          plant: task.plant,
          nextDate: task.nextDate,
          nextTask: task.nextTask,
          startingDate: task.startingDate,
          transplantDate: task.transplantDate,
          daysDifferenceBetweenTaskAndToday: task.daysDifferenceBetweenTaskAndToday,
          realHarvestingDate: task.realHarvestingDate,
          harvestingWeight: task.harvestingWeight,
          failureReasons: task.failureReasons,
        },
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe(updatedTask => {
        if (updatedTask.failureReasons != null) {
          this.deleteTask(updatedTask.taskId);
          this.taskService.saveFailedTask(updatedTask);
        }
        if (updatedTask.transplantDate != null) {
          this.taskService.saveTransplantedTask(updatedTask).subscribe();
        }
        
      });
  }

  deleteTask(taskId: number) {
    var index = this.taskList.findIndex((deletedTask) => (deletedTask.taskId === taskId));
    if (index != -1) {
      this.taskList.splice(index, 1);
    }
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

  private keepFourTasksOnly(taskList: ITask[]) {
    if (this.patchFromHomepage) {
      this.taskList = taskList.slice(0, 4);
    }
  }

}
