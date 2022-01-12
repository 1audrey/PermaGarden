import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: ITask;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter();

  patch!: IPatch;
  isGettingDate: boolean = false;

  constructor(private patchService: PatchesService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }

  openTask(){
    const dialogRef = this.dialog.open(CompleteTaskDialogComponent, {
      width: '50%',
      data: {
        patchName: this.task.patchName,
        action: this.task.action,
        plant: this.task.plant,
        nextDate: this.task.nextDate,
        nextTask: this.task.nextTask,
        startingDate: this.task.startingDate,
        daysDifferenceBetweenTaskAndToday: this.task.daysDifferenceBetweenTaskAndToday,
        realHarvestingDate: this.task.realHarvestingDate,
        transplantDate: this.task.transplantDate,
        firstTaskSuccess: this.task.firstTaskSuccess,
        harvestingWeight: this.task.harvestingWeight
       },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.task = result;

      }
      if(result.firstTaskSuccess === 'No' || result.harvestingWeight != null){
        this.taskDeleted.emit();
      }



    });
  }

  deleteTask(){
    this.taskDeleted.emit();

  }
}
