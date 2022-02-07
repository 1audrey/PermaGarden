import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';

import { map } from 'rxjs/operators';
import { PlantsService } from "../services/plants/plants.service";

@Injectable()
export class PlantsListResolver implements Resolve<any> {

  constructor(private plantsService: PlantsService){

  }

  resolve(){
    return this.plantsService.getAllPlants().pipe(map(plants => plants));
  }
}
