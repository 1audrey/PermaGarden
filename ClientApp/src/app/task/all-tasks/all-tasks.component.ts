import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from '../dialog-create-task/dialog-create-task.component';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../models/itask-model';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  private static readonly PATCHES = 'patches';
  private static readonly TASKS = 'tasks';

  tasks!: ITask[];
  patches!: IPatchShapeModel[];
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
    this.patches = this.route.snapshot.data[AllTasksComponent.PATCHES];
    this.tasks = this.route.snapshot.data[AllTasksComponent.TASKS];
  }

  createTask(){
    this.dialog.open(DialogCreateTaskComponent, {
      width: '250px',
    });
  }
}
