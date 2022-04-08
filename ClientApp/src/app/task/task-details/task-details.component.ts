import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { PatchesService } from '../../services/patches/patches.service';

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
  task!: ITask;

  constructor(private route: ActivatedRoute,
    private patchService: PatchesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    var params = this.route.snapshot.params['patchName'];
    if (params) {
      this.route.data.forEach((data) => {
          this.patch = data['patchName'][0];
        });

      if (params === this.patch.patchName) {
          if (this.patch.taskList) {
            this.task = this.patch.taskList[0];
            this.patchName = this.patch.patchName;
          }
      }
    }
    if (this.patchWithoutParams.taskList) {
      for (let taskWithParams of this.patchWithoutParams.taskList) {
        this.task = taskWithParams;
        this.patchName = this.patchWithoutParams.patchName
      } 
    }
  }

  openTask() {
    const dialogRef = this.dialog.open(CompleteTaskDialogComponent, {
      width: '50%',
      data: {
        patchName: this.task.patchName,
        currentTask: this.task.currentTask,
        plant: this.task.plant,
        nextDate: this.task.nextDate,
        nextTask: this.task.nextTask,
        startingDate: this.task.startingDate,
        daysDifferenceBetweenTaskAndToday: this.task.daysDifferenceBetweenTaskAndToday,
        realHarvestingDate: this.task.realHarvestingDate,
        firstTaskSuccess: this.task.firstTaskSuccess,
        harvestingWeight: this.task.harvestingWeight
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.task = result;

      }
      if (result.firstTaskSuccess === 'No' || result.harvestingWeight != null) {
        this.taskDeleted.emit();
      }
    });
  }

  deleteTask() {
    this.taskDeleted.emit();

  }


}
