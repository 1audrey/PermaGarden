import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchesService } from '../../services/patches/patches.service';


@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.css']
})
export class DialogCreateTaskComponent implements OnInit {

  private static readonly CREATEPATCH_WEBSITE_URL: string = 'create-patch';
  private static readonly PLANTS_LIST_WEBSITE_URL: string = 'plants-list';
  private static readonly CREATE_TASK_WEBSITE_URL: string = '/create-task';

  patchControl = new FormControl('', Validators.required);
  patchName!: string;
  public isLoaded: boolean = false;
  patches: IPatchShapeModel[];
  plantListEmpty: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogCreateTaskComponent>,
    private patchService: PatchesService,
    private router: Router,
    private notifications: NotificationsService) { }

  ngOnInit(): void {
    this.patchService.getPatchesShape().subscribe(allPatches => {
      this.patches = allPatches;
      this.isLoaded = true;
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  createPatch() {
    this.dialogRef.close();
    this.router.navigate([DialogCreateTaskComponent.CREATEPATCH_WEBSITE_URL]);
  }

  goToPlantsPage() {
    this.dialogRef.close();
    this.router.navigate([DialogCreateTaskComponent.PLANTS_LIST_WEBSITE_URL]);
  }

  enterTaskPageForPatch(patchName: string) {
    for (let patch of this.patches) {
      this.checkIfPatchHasPlants(patch, patchName)
    }
    this.router.navigate([DialogCreateTaskComponent.CREATE_TASK_WEBSITE_URL, patchName]);
    this.dialogRef.close();
  }

  private checkIfPatchHasPlants(patch:IPatchShapeModel, patchName: string){
    if (patch.patchName === patchName && !patch.plantList?.length) {
      this.notifications.showWarning(`You need to add plants to ${patchName} before creating tasks`);
      return;
    }
  }
}
