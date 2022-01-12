import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { PatchesService } from 'src/app/shared/patches.service';
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

  answers: string[] = [
    "Yes",
    "No"
  ]

  constructor(
    public dialogRef: MatDialogRef<CompleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: ITask,
    private patchService: PatchesService,
    private notifications: NotificationsService
    ) { }

  cancel(){
    this.dialogRef.close();
    }

  save(formValues: ITask){
    if(this.selectedTransplantDate){
      this.isDirty = false;
      formValues.patchName = this.task.patchName;
      formValues.action = this.task.action;
      formValues.nextTask = this.task.nextTask;
      formValues.plant = this.task.plant;
      formValues.startingDate = this.task.startingDate;
      formValues.nextDate = this.task.nextDate;
      formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
      console.log(formValues);
      this.patchService.saveNextTaskInPatch(formValues);
      this.notifications.showSuccess(`${formValues.patchName} has been successfully updated`);
      this.dialogRef.close(formValues);
    }
  }

  failedTask(formValues: ITask){
      this.isDirty = false;
      formValues.patchName = this.task.patchName;
      formValues.action = this.task.action;
      formValues.nextTask = this.task.nextTask;
      formValues.plant = this.task.plant;
      formValues.startingDate = this.task.startingDate;
      formValues.nextDate = this.task.nextDate;
      formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
      console.log(formValues);
      this.patchService.saveFailedTaskInPatch(formValues);
      this.notifications.showSuccess(`${formValues.patchName} has been successfully updated`);
      this.dialogRef.close(formValues);
  }

  saveHarvestTask(formValues: any){
    this.isDirty = false;
    formValues.patchName = this.task.patchName;
    formValues.action = this.task.action;
    formValues.nextTask = this.task.nextTask;
    formValues.plant = this.task.plant;
    formValues.startingDate = this.task.startingDate;
    formValues.nextDate = this.task.nextDate;
    formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
    console.log(formValues);
    this.patchService.saveHarvestedTaskInPatch(formValues);
    this.notifications.showSuccess(`${formValues.patchName} has been successfully updated`);
    this.dialogRef.close(formValues);
  }



}
