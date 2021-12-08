import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { PatchesService } from 'src/app/shared/patches.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-manage-patch-tasks',
  templateUrl: './manage-patch-tasks.component.html',
  styleUrls: ['./manage-patch-tasks.component.css']
})
export class ManagePatchTasksComponent implements OnInit {
  patch!: any;

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

}
