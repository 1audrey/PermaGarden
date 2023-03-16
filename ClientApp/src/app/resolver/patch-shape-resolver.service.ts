import { Injectable } from '@angular/core';
import { PatchesService } from '../services/patches/patches.service';
import { ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PatchShapeResolverService {

  constructor(private patchService: PatchesService) { }

  resolve(route: ActivatedRouteSnapshot){
    // return this.patchService.getASinglePatch(route.params['patchName']);

  }
}
