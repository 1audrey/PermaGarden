import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from '../dialog-create-task/dialog-create-task.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  allTasks: ITask[] = [];

  constructor(public dialog: MatDialog,
    private patchService: PatchesService,
   ) { }

   ngOnInit(){
    this.allTasks = this.patchService.getAllTasks();

  }

  onTaskDeleted(task: ITask){
    var index = this.allTasks.findIndex(deletedTask => (deletedTask === task));
    if (index != -1) {
      this.allTasks.splice(index, 1);
    }
  }

  createTask(){
    this.dialog.open(DialogCreateTaskComponent, {
      width: '250px',
    });
  }
}
