import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { ITask } from '../models/itask-model';
import { NotificationsService } from 'src/app/shared/notifications.service';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';

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


  @Input() patch!: IPatch;

  constructor(private patchService: PatchesService,
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
  }

  getPlantStartingMethod() {
    let patchPlantList: string;
    if (this.patch.plantlist?.length && this.selectedPlant) {
      for (let plant of this.patch.plantlist) {
        if (plant.name == this.selectedPlant.name) {
          patchPlantList = plant.startingMethod;

          this.tasks =
          [
            { value: patchPlantList },
          ];
        }
      }
    }
}

  saveTask(patchName: string, formValues: ITask) {
    this.isDirty = false;
    formValues.patchName = patchName;
    this.patchService.saveTaskInPatch(patchName, formValues);
    this.notifications.showSuccess(`${formValues.action} has been added to ${this.patch.name}`);
    this.router.navigate(['garden']);
    console.log(formValues);

  }

  cancel() {
    this.route.snapshot.params['patchName'];
  }

}


