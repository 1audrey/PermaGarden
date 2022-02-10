import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  patch!: any;
  isDirty: boolean = true;
  plants!: Observable<Array<IPlantsList>>
  selectedIcon!: string;
  selectedPlants: IPlantsList[] = [];
  icons!: IPatchShape[];

  //icons: IPatchShape[] =
  //  [{
  //    patchImageId:1,
  //    patchImageTitle: 'square',
  //    patchImagePicture: 'assets/shapes/square-shape.png'
  //  },
  //    {
  //     patchImageId: 2,
  //    patchImageTitle: 'hexagone',
  //    patchImagePicture: 'assets/shapes/hexagon-shape.png'
  //  }
  //  ];

  constructor(private patchService: PatchesService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationsService,
    private patchImageService: PatchImageService  ) { }

  ngOnInit() {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
    this.plants = this.route.snapshot.data['plants'];
    this.patchImageService.getAllPatchesImages().subscribe(images => {
      this.icons = images;
    });

    for (let icon of this.icons) {
      if (this.patch.icon === icon.patchImagePicture) {
        this.selectedIcon = icon.patchImagePicture
      }
    }

    this.plants.subscribe(plants => {
      for (let plant of plants) {
        for (let patchName of this.patch.plantlist) {
          if (patchName.name === plant.plantName) {
            this.selectedPlants.push(plant);
          }
        }
      }
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
      this.patch.name = formValues.patchName;
      this.patch.icon = formValues.patchImagePicture;
      this.patch.plantlist = formValues.plantList;

      this.notifications.showSuccess(`${formValues.patchName} has been added to your garden`);
      this.router.navigate(['garden']);
      console.log(formValues);
    }



  }
}


