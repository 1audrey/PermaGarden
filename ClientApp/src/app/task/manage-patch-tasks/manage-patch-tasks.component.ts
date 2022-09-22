import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { ITask } from '../models/itask-model';

@Component({
  selector: 'app-manage-patch-tasks',
  templateUrl: './manage-patch-tasks.component.html',
  styleUrls: ['./manage-patch-tasks.component.css']
})
export class ManagePatchTasksComponent implements OnInit {

  private static readonly PATCHNAME = 'patchName';
  private static readonly GARDEN = 'garden';

  patch!: any;
  task!: ITask;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationsService) { }

  ngOnInit(): void {
    this.route.data.forEach((data) => {
      this.patch = data[ManagePatchTasksComponent.PATCHNAME][0];
    });
  }

  cancel() {
    this.router.navigate([ManagePatchTasksComponent.GARDEN]);
  }

  createTask() {
    this.route.snapshot.params[ManagePatchTasksComponent.PATCHNAME];
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
