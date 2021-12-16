import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';
import * as moment from 'moment';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: ITask;
  @Input() patch!: IPatch;

  diffInDays!: number;
  isGettingDate: boolean = false;

  constructor(private patchService: PatchesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
    // this.diffInDays = this.patchService.getDifferenceBetweenTaskDateAndTodaydate(this.patch);

  }

}
