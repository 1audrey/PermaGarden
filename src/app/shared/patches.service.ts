import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPlantsList } from '../garden-list/models/iplants-model';
import { IPatch } from '../garden/garden-footprint/models/ipatch-model';
import * as patches from "./patch-list.json";

@Injectable()
export class PatchesService {
  static PATCHES: any = [];
  constructor() { }

  getPatch(): Observable<IPatch[]> {
    let subject = new Subject<IPatch[]>()
    setTimeout(() => { subject.next(this.PATCHES); subject.complete(); },
      100)

    return subject;
  }

  savePlantInPatch(patchName: string, plant: IPlantsList) {
    var newPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === patchName) {
        patch.plantlist.push(plant);
      }
      newPatches.push(patch);
    }
    this.PATCHES = newPatches;

  }


  PATCHES = (patches as any).default;
}


