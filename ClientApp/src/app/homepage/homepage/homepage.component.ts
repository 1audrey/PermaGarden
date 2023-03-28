import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatchShapeModel } from 'src/app/homepage/garden-canvas/models/iPatchShape-model';
import { ITask } from 'src/app/task/models/itask-model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private static readonly PATCHES = 'patches';
  private static readonly TASKS = 'tasks';

  tasks!: ITask[];
  patches!: IPatchShapeModel[];
  patchFromHomepage: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.patches = this.route.snapshot.data[HomepageComponent.PATCHES];
    this.tasks = this.route.snapshot.data[HomepageComponent.TASKS];

  }


}
