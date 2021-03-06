import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchImageService } from '../../services/patches/patch-image.service';
import { PatchesService } from '../../services/patches/patches.service';
import { PlantsService } from '../../services/plants/plants.service';

import { IPatch } from '../models/ipatch-model';
import { IPatchShape } from '../models/ipatch-shape';

@Component({
  selector: 'app-create-patch',
  templateUrl: './create-patch.component.html',
  styleUrls: ['./create-patch.component.css']
})
export class CreatePatchComponent implements OnInit {
  isDirty: boolean = true;
  newPatch!: any;
  icons!: IPatchShape[];
  plants!: IPlantsList[];
  selectedIcon!: string;
  selectedPlant!: IPlantsList[];
  patches!: IPatch[];

  constructor(private router: Router,
    private notifications: NotificationsService,
    private patchService: PatchesService,
    private plantService: PlantsService,
    private patchImageService: PatchImageService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.plantService.getAllPlants().subscribe(plants => {
      this.plants = plants;
    });

    this.patchImageService.getAllPatchesImages().subscribe(images => {
      this.icons = images;
    });
  }

  cancel() {
    this.router.navigate(['garden']);
  }

  saveNewPatch(formValues: IPatch) {
    this.isDirty = false;

    this.patches = this.route.snapshot.data['patches'];

    for (let patch of this.patches) {
      if (this.checkIfPatchWithSameNameExists(patch.patchName, formValues.patchName)) {
        return;
      }
    }

    if (formValues.patchName === null || formValues.patchImagePicture === null) {
      this.notifications.showError(`Oops something went wrong, please fill all the required fields`);
    }
    else {
      this.patchService.saveNewPatch(formValues).subscribe(() => {
        this.notifications.showSuccess(`${formValues.patchName} has been added to your garden`);
        this.router.navigate(['garden']);
        console.log(formValues);
      });
    }
  }

  private checkIfPatchWithSameNameExists(existingPatchName: string, newPatchName: string): boolean {
    if (existingPatchName.toLowerCase() === newPatchName.toLowerCase()) {
      this.notifications.showWarning(`You already have a patch called ${newPatchName}`);
      return true;
    }
    return false;
  }
}
