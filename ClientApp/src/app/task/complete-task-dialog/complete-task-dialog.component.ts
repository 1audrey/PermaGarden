import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchesService } from '../../services/patches/patches.service';
import { TasksService } from '../../services/tasks/tasks.service';

import { ITask } from '../models/itask-model';

@Component({
  selector: 'app-complete-task-dialog',
  templateUrl: './complete-task-dialog.component.html',
  styleUrls: ['./complete-task-dialog.component.css']
})
export class CompleteTaskDialogComponent {
  isDirty: boolean = true;
  nextTaskForm!: any;
  selectedAnswer!: string;
  selectedHarvestingDate!: Array<Date>;
  selectedTransplantDate!: Date;
  harvestSelectedAnswer!: string;
  patchName!: string;
  failureReasons!: string;

  answers: string[] = [
    "Yes",
    "No"
  ]

  constructor(
    public dialogRef: MatDialogRef<CompleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: ITask,
    private patchService: PatchesService,
    private taskService: TasksService,
    private notifications: NotificationsService,
    private route: ActivatedRoute
    ) { }

  cancel(){
    this.dialogRef.close();
    }

  saveTransplantTask(formValues: ITask){
    if (formValues.transplantDate){
      this.isDirty = false;
      formValues.taskId = this.task.taskId;
      formValues.currentTask = this.task.currentTask;
      formValues.nextTask = this.task.nextTask;
      formValues.plant = this.task.plant;
      formValues.startingDate = this.task.startingDate;
      formValues.nextDate = this.task.nextDate;
      formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
      this.task.transplantDate = formValues.transplantDate;
      this.notifications.showSuccess(`${formValues.currentTask} has been successfully updated`);
      this.dialogRef.close(formValues);
    }
  }

  saveFailedTask(formValues: ITask){
    this.isDirty = false;
    formValues.taskId = this.task.taskId;
    formValues.currentTask = this.task.currentTask;
    formValues.nextTask = this.task.nextTask;
    formValues.plant = this.task.plant;
    formValues.startingDate = this.task.startingDate;
    formValues.nextDate = this.task.nextDate;
    formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
    this.task.failureReasons = formValues.failureReasons;
    this.notifications.showSuccess(`The task '${formValues.currentTask}' for the plant '${formValues.plant.plantName}' has been successfully updated`);
    this.dialogRef.close(formValues);
  }

  saveHarvestTask(formValues: any) {
      this.isDirty = false;
      formValues.taskId = this.task.taskId;
      formValues.currentTask = this.task.currentTask;
      formValues.nextTask = this.task.nextTask;
      formValues.plant = this.task.plant;
      formValues.startingDate = this.task.startingDate;
      formValues.nextDate = this.task.nextDate;
      formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
      this.notifications.showSuccess(`${formValues.currentTask} has been successfully updated`);
      this.dialogRef.close(formValues);
  }
}
