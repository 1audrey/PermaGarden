import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: ITask;
  constructor(private patchService: PatchesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.task = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }

}
