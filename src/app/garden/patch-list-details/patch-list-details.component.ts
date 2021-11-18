import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { PatchResolverService } from 'src/app/resolver/patch-resolver.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { PatchesService } from 'src/app/shared/patches.service';
import { PlantsService } from 'src/app/shared/plants.service';
import { IPatch } from '../models/ipatch-model';
import { IPatchShape } from '../models/ipatch-shape';
import { PatchListComponent } from '../patch-list/patch-list.component';

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

  icons: IPatchShape[] =
    [{
      name: 'square',
      url: 'assets/shapes/square-shape.png'
    },
    {
      name: 'hexagone',
      url: 'assets/shapes/hexagon-shape.png'
    }
    ];

  constructor(private patchService: PatchesService, private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationsService,
    private plantService: PlantsService) { }

  ngOnInit() {
    this.patch = this.patchService.getSinglePatch(this.route.snapshot.params['patchName']);
    this.plants = this.plantService.getPlants();

    for (let icon of this.icons) {
      if (this.patch.icon === icon.url) {
        this.selectedIcon = icon.url
      }
    }

    this.plants.subscribe(plants => {
      for (let plant of plants) {
        for (let patchName of this.patch.plantlist) {
          if (patchName.name === plant.name) {
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
    if (formValues.name === null || formValues.icon === null) {
      this.notifications.showError(`Oops something went wrong, please fill all the required fields`);
    }
    else {
      this.patch.name = formValues.name;
      this.patch.icon = formValues.icon;
      this.patch.plantlist = formValues.plantlist;

      this.notifications.showSuccess(`${formValues.name} has been added to your garden`);
      this.router.navigate(['garden']);
      console.log(formValues);
    }



  }
}


