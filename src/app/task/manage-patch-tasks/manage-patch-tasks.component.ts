import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  public static readonly CREATETASK_WEBSITE_URL: string = '/create-task';

  constructor(private patchService: PatchesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private notification: NotificationsService) { }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }

  cancel() {
    this.router.navigate(['garden']);
  }

  createTask(){
    var plantListInPatch = this.patch.plantlist;
    if(plantListInPatch !== undefined){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.height = '50%';

      dialogConfig.data = {
       patch: this.patch

    };

        this.dialog.open(CreateTaskComponent, dialogConfig);
  }
  else
  {
    this.notification.showWarning('You need to add a plant to your patch before creating a task');
  }
}

}
