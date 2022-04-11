import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() patchWithoutParams!: IPatch;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter();
  isGettingDate: boolean = false;
  patchName!: string;
  patch!: IPatch;
  taskList: ITask[] = [];
  daysDifferenceBetweenTaskAndToday!: number;
  nextDate!: any;
  todayDate!: any;

  constructor(private route: ActivatedRoute,

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
  
    this.getDifferenceBetweenTaskDateAndTodaydate();
    this.sortTasksByEarliestDate();
  }

  openTask() {
    for (let task of this.taskList) {
      const dialogRef = this.dialog.open(CompleteTaskDialogComponent, {
        width: '50%',
        data: {
          patchName: task.patchName,
          currentTask: task.currentTask,
          plant: task.plant,
          nextDate: task.nextDate,
          nextTask: task.nextTask,
          startingDate: task.startingDate,
          daysDifferenceBetweenTaskAndToday: task.daysDifferenceBetweenTaskAndToday,
          realHarvestingDate: task.realHarvestingDate,
          firstTaskSuccess: task.firstTaskSuccess,
          harvestingWeight: task.harvestingWeight
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          task = result;

        }
        if (result.firstTaskSuccess === 'No' || result.harvestingWeight != null) {
          this.taskDeleted.emit();
        }
      });
    }
  }

  deleteTask() {
    this.taskDeleted.emit();
  }

  getDifferenceBetweenTaskDateAndTodaydate() {
    for (let task of this.taskList) {
      let taskNextDate = new Date(task.nextDate);
      let today = new Date();

      this.nextDate = moment(taskNextDate.toString().substring(0, 15));
      this.todayDate = moment(today.toString().substring(0, 15));
      task.daysDifferenceBetweenTaskAndToday = Math.ceil(this.nextDate.diff(this.todayDate, 'days'));
      console.log(`the difference between planting and sowing dates ${this.daysDifferenceBetweenTaskAndToday}`);
    }
  }

  sortTasksByEarliestDate() {
      this.taskList.sort((task1: ITask, task2: ITask) => {
        if (task1.daysDifferenceBetweenTaskAndToday > task2.daysDifferenceBetweenTaskAndToday) {
          return 1;
        }

        if (task1.daysDifferenceBetweenTaskAndToday < task2.daysDifferenceBetweenTaskAndToday) {
          return -1;
        }

        return 0;
      })
    }
  

}
