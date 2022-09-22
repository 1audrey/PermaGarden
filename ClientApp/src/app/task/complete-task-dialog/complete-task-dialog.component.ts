import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
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
  harvestingWeight!: string;

  answers: string[] = [
    "Yes",
    "No"
  ]

  constructor(
    public dialogRef: MatDialogRef<CompleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: ITask,
    ) { }

  cancel(){
    this.dialogRef.close();
    }

  saveTransplantTask(formValues: ITask){
    if (formValues.transplantDate){
      this.isDirty = false;
      this.getMainTaskData(formValues);
      this.task.transplantDate = formValues.transplantDate;
      this.dialogRef.close(formValues);
    }
  }

  saveFailedTask(formValues: ITask){
    this.isDirty = false;
    this.getMainTaskData(formValues);
    formValues.transplantDate = this.task.transplantDate;
    formValues.harvestedWeight = this.task.harvestedWeight;
    formValues.realHarvestingDates = this.task.realHarvestingDates;
    this.task.failureReasons = formValues.failureReasons;
    this.dialogRef.close(formValues);
  }

  saveHarvestTask(formValues: any) {
      let allHarvestedWeight = [];
      let allHarvestingDates = [];

      if(this.task.harvestedWeight == null && this.task.realHarvestingDates == null){
        allHarvestedWeight.push(this.harvestingWeight);
        allHarvestingDates.push(this.selectedHarvestingDate);
      }
      else{
        allHarvestedWeight.push(this.task.harvestedWeight);
        allHarvestingDates.push(this.task.realHarvestingDates);
        allHarvestedWeight.push(this.harvestingWeight);
        allHarvestingDates.push(this.selectedHarvestingDate);
      }

      this.isDirty = false;
      this.getMainTaskData(formValues);
      formValues.harvestedWeight = allHarvestedWeight;
      formValues.realHarvestingDates = allHarvestingDates;
      formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
      this.dialogRef.close(formValues);
  }

  private getMainTaskData(formValues: ITask){
    formValues.taskId = this.task.taskId;
    formValues.patchId = this.task.patchId;
    formValues.seedsUsed = this.task.seedsUsed;
    formValues.currentTask = this.task.currentTask;
    formValues.nextTask = this.task.nextTask;
    formValues.plantId = this.task.plantId;
    formValues.startingDate = this.task.startingDate;
    formValues.nextDate = this.task.nextDate;
    formValues.daysDifferenceBetweenTaskAndToday = this.task.daysDifferenceBetweenTaskAndToday;
  }
}
