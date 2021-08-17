import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlantImageService } from '../shared/plant-image.service';

@Injectable()
export class PlantImageResolverService implements Resolve<any>{

  constructor(private plantImageService: PlantImageService) { }

  resolve(){
    return this.plantImageService.getPlantsImage().pipe(map(images => images))
  }


}

