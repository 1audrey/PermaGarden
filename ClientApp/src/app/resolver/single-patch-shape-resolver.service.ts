import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PatchesService } from '../services/patches/patches.service';

@Injectable({
  providedIn: 'root'
})
export class SinglePatchShapeResolverService implements Resolve<any>{

  constructor(private patchService: PatchesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.patchService.getASinglePatchShape(route.params['patchName']);

  }
}
