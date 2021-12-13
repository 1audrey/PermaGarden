import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';

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
    this.patches = this.patchService.getPatch();

    this.patches.subscribe(patches => {
      for (let patch of patches) {
        if(patch.tasklist?.length){
          for (let task of patch.tasklist) {
            this.allTasks.push(task);
        }
      }
    }
  });

}

}
