import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PatchImageService } from '../../services/patches/patch-image.service';
import { PatchesService } from '../../services/patches/patches.service';

import { IPatch } from '../models/ipatch-model';
import { IPatchShape } from '../models/ipatch-shape';

@Component({
  selector: 'app-patch-list-details',
  templateUrl: './patch-list-details.component.html',
  styleUrls: ['./patch-list-details.component.css']
})
export class PatchListDetailsComponent implements OnInit {
  patch!: IPatch;
  isDirty: boolean = true;
  plants: IPlantsList[] = [];
  selectedIcon!: string;
/*  selectedPlants: IPlantsList[] = [];*/
  icons!: IPatchShape[];
 /* selectedPlantsName : string[] = [];*/

  constructor(private patchService: PatchesService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationsService,
    private patchImageService: PatchImageService) { }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.patch = data['patchName'][0];
    });
    
    this.selectedIcon = this.patch.patchImagePicture;

    //if (this.patch.plantList != undefined) {
    //  for (let plant of this.plants) {
    //    for (let plantInPatch of this.patch.plantList) {
    //      if (plantInPatch.plantName === plant.plantName) {
    //        this.selectedPlants.push(plant);
    //      }
    //    }
    //  }
    //}  

    this.patchImageService.getAllPatchesImages().subscribe(images => {
      this.icons = images;
    });
  }

  cancel() {
    this.router.navigate(['garden']);
  }

  saveEditedPatch(formValues: IPatch) {
    this.isDirty = false;
    if (formValues.patchName === null || formValues.patchImagePicture === null) {
      this.notifications.showError(`Oops something went wrong, please fill all the required fields`);
    }
    else {
      formValues.patchId = this.patch.patchId;
      this.patch.patchName = formValues.patchName;
      this.patch.patchImagePicture = formValues.patchImagePicture;
      this.patchService.editPatch(formValues).subscribe(() => {
        this.notifications.showSuccess(`${formValues.patchName} has been updated`);
        this.router.navigate(['garden']);
        console.log(formValues);
      });
      
    }
  }
  }


