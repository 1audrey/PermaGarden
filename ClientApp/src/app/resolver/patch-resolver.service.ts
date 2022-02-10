import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { PatchesService } from '../services/patches/patches.service';


@Injectable()
export class PatchResolverService implements Resolve<any> {

  constructor(private patchService: PatchesService) { }

  resolve(){
    return this.patchService.getAllPatches().pipe(map(patches => patches));
  }
}
