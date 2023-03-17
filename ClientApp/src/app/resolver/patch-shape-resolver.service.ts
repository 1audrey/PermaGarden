import { Injectable } from '@angular/core';
import { PatchesService } from '../services/patches/patches.service';
import { map } from 'rxjs/operators';
import { Resolve } from '@angular/router';

@Injectable()
export class PatchShapeResolverService implements Resolve<any>{

  constructor(private patchService: PatchesService) { }

  resolve(){
    return this.patchService.getPatchesShape().pipe(map(patches => patches));
  }
}
