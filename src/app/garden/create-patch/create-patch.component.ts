import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { PatchesService } from 'src/app/shared/patches.service';
import { PlantsService } from 'src/app/shared/plants.service';
import { IPatch } from '../models/ipatch-model';
import { IPatchShape } from '../models/ipatch-shape';

@Component({
  selector: 'app-create-patch',
  templateUrl: './create-patch.component.html',
  styleUrls: ['./create-patch.component.css']
})
export class CreatePatchComponent implements OnInit{
  isDirty: boolean = true;
  newPatch!: any;
  icon!: IPatchShape[];
  plants!: Observable<Array<IPlantsList>>

  selectedIcon!: string;
  selectedPlants!: string;

  constructor(private router: Router,
    private notifications: NotificationsService,
    private patchService: PatchesService,
    private plantService: PlantsService
) { }

  icons: IPatchShape[] =
    [{
      name: 'square',
      url: 'assets/shapes/square-shape.png'
    },
    {
      name: 'hexagone',
      url: 'assets/shapes/hexagon-shape.png'
    }
    ]

   ngOnInit(){
    this.plants = this.plantService.getPlants();
  }

  cancel() {
    this.router.navigate(['garden-footprint']);
  }

  savePatch(formValues: IPatch){
    this.isDirty = false;
    if(formValues.name === null || formValues.icon === null)
    {
      this.notifications.showError(`Oops something went wrong, please fill all the required fields`);
    }
    else
    {
      formValues.plantlist === [];
      this.patchService.savePatch(formValues);
      this.notifications.showSuccess(`${formValues.name} has been added to your garden`);
      this.router.navigate(['garden-footprint']);
      console.log(formValues);
    }
  }



}
