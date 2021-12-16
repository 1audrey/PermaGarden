import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';
import * as moment from 'moment';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  patches!: Observable<IPatch[]>;
  allTasks: ITask[] = [];


  constructor(private route: ActivatedRoute,
    private patchService: PatchesService) { }

   ngOnInit(){
    this.allTasks = this.patchService.getAllTasks();

}

}
