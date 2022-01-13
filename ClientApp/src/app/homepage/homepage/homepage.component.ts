import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from 'src/app/task/models/itask-model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allTasks: ITask[] = [];
  diffInDays!: number;
  firstFourTasks: ITask[] =[];

  constructor(private patchService: PatchesService) { }

  ngOnInit() {
   this.allTasks = this.patchService.getAllTasks().sort((a, b) => a.daysDifferenceBetweenTaskAndToday - b.daysDifferenceBetweenTaskAndToday);
   this.firstFourTasks = this.allTasks.slice(0, 4);

  }


}
