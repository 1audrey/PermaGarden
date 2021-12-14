import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: ITask;
  @Input() patch!: IPatch;
  constructor(private patchService: PatchesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);

    ///needs to be calculated and returned from backend
    ///needs to do the same for the nextDate
    // this.nextTask = this.patchService.getNextTask(this.patch);

  }
}
