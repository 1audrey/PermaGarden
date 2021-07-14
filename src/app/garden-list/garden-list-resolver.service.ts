import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { PlantsService } from "./shared/plants.service";
import { map } from 'rxjs/operators';

@Injectable()
export class GardenListResolver implements Resolve<any> {

  constructor(private plantsService: PlantsService){

  }

  resolve(){
    return this.plantsService.getPlants().pipe(map(plants => plants))
  }
}
