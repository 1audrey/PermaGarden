import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchesService } from '../../services/patches/patches.service';


@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.css']
})
export class DialogCreateTaskComponent implements OnInit {

  public static readonly CREATEPATCH_WEBSITE_URL: string = '/create-patch';
  public static readonly PLANTS_LIST_WEBSITE_URL: string = '/plants-list';

  patchControl = new FormControl('', Validators.required);
  patchName!: string;
  public isLoading: boolean = false;
  patches!: IPatch[];
  plantListEmpty: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
    private patchService: PatchesService,
    private router: Router,
    private notifications: NotificationsService) { }

  ngOnInit(): void {
    this.patchService.getAllPatches().subscribe(allPatches => {
      this.patches = allPatches;
      this.isLoading = true;
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  createPatch() {
    const link = document.createElement('a');
    link.href = DialogCreateTaskComponent.CREATEPATCH_WEBSITE_URL;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  goToPlantsPage() {
    this.dialogRef.close();
    const link = document.createElement('a');
    link.href = DialogCreateTaskComponent.PLANTS_LIST_WEBSITE_URL;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  createTaskPage(patchName: string) {
    for (let patch of this.patches) {
      if (patch.patchName === patchName && !patch.plantList?.length) {
        this.notifications.showWarning(`You need to add plants to ${patchName} before creating tasks`);
        return;
      }
    }
    this.router.navigate(['/create-task', patchName]);
    this.dialogRef.close();

  }

}
