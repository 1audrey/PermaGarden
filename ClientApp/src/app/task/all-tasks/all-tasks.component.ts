import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/itask-model';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from '../dialog-create-task/dialog-create-task.component';
import { IPatch } from '../../garden/models/ipatch-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  allTasks: ITask[] = [];
  patches!: IPatch[];
  selectedFilter!: string;
  filters = [
    { type: 'All' },
    { type: 'Late' },
    { type: 'Today' },
    { type: 'In the Week' },
    { type: 'Coming' }
  ]

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute
   ) { }

  ngOnInit() {
    this.patches = this.route.snapshot.data['patches'];
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
