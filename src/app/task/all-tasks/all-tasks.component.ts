import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';
import * as moment from 'moment';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  allTasks: ITask[] = [];

  constructor(private route: ActivatedRoute, private patchService: PatchesService) { }

   ngOnInit(){
    this.allTasks = this.patchService.getAllTasks();
  }

  onTaskDeleted(task: ITask){
    var index = this.allTasks.findIndex(deletedTask => (deletedTask === task));
    if (index != -1) {
      this.allTasks.splice(index, 1);
    }
  }
}
