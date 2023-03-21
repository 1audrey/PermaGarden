import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlantsService } from '../services/plants/plants.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivedPlantsResolverService {

  constructor(private plantService: PlantsService) { }

  resolve(){
    return this.plantService.getAllArchivedPlants().pipe(map(archivedPlants => archivedPlants));
  }
}
