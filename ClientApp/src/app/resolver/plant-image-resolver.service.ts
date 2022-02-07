import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlantImageService } from '../services/plants/plant-image.service';


@Injectable()
export class PlantImageResolverService implements Resolve<any>{

  constructor(private plantImageService: PlantImageService) { }

  resolve(){
    return this.plantImageService.getAllPlantsImages().pipe(map(images => images))
  }


}

