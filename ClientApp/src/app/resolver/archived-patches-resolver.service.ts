import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PatchesService } from '../services/patches/patches.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivedPatchesResolverService {

  constructor(private patchService: PatchesService) { }

  resolve(){
    return this.patchService.getAllArchivedPatches().pipe(map(archivedPatches => archivedPatches));
  }
}
