import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchesService } from '../../services/patches/patches.service';
import { ITask } from '../models/itask-model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  isDirty: boolean = true;
  newTask!: any;
  selectedPlant!: IPlantsList;
  selectedTask!: string;
  selectedDate!: Date;
  plants!: IPlantsList[];
  tasks!: any;
  currentTask!: string;

  @Input() patch!: IPatch;

  constructor(private patchService: PatchesService,
    private tasksService: TasksService,
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    this.route.data.forEach((data) => {
      this.patch = data['patchName'][0];
      console.log(this.patch);
    });
  }

  getPlantStartingMethod() {
  this.currentTask= this.selectedPlant.plantStartingMethod;
  }

  saveTask(formValues: ITask) {
    this.isDirty = false;
    this.tasksService.saveNewTask(formValues).subscribe();
    this.tasksService.saveTaskInPatch(this.patch.patchName, this.patch.patchId).subscribe();
    this.tasksService.savePlantInTask(this.selectedPlant.plantId).subscribe();
    this.notifications.showSuccess(`${formValues.currentTask} has been added to ${this.patch.patchName}`);
    this.router.navigate(['tasks']);
    console.log(formValues);
  }

  cancel() {
    this.router.navigate(['tasks']);
  }

}


