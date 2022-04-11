import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';

import { ITask } from 'src/app/task/models/itask-model';
import { PatchesService } from '../../services/patches/patches.service';
import { PlantsService } from '../../services/plants/plants.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  plants: IPlantsList[] = [];
  patches!: IPatch[];
  allTasks!: ITask[];

  constructor(private route: ActivatedRoute,
    private patchService: PatchesService,
    private plantsService: PlantsService) {

     }

  ngOnInit() {
    this.plants = this.route.snapshot.data['plants'];
    this.patches = this.route.snapshot.data['patches'];
   /* this.allTasks = this.patchService.getAllTasks();*/
  }

}
