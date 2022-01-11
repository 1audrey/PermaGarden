import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { PatchesService } from 'src/app/shared/patches.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask } from '../models/itask-model';

@Component({
  selector: 'app-manage-patch-tasks',
  templateUrl: './manage-patch-tasks.component.html',
  styleUrls: ['./manage-patch-tasks.component.css']
})
export class ManagePatchTasksComponent implements OnInit {
  patch!: any;
  task!: ITask;

  constructor(private patchService: PatchesService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationsService) { }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }

  cancel() {
    this.router.navigate(['garden']);
  }

  createTask() {
    this.route.snapshot.params['patchName'];
  }

  notificationForMissingPlants() {
    this.notification.showWarning('You need to add a plant to your patch before creating a task');
  }

  onTaskDeleted(task: ITask){
    var index = this.patch.tasklist.findIndex((deletedTask: ITask) => (deletedTask === task));
    if (index != -1) {
      this.patch.tasklist.splice(index, 1);
    }
  }
}
