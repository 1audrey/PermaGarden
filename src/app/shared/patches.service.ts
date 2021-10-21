import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPatch } from '../garden/garden-footprint/models/ipatch-model';
import * as patches from "./patch-list.json";

@Injectable()
export class PatchesService {
  static PATCHES: any = [];
  constructor() { }

  getPatch(): Observable<IPatch[]>{
    let subject = new Subject<IPatch[]>()
    setTimeout(() => {subject.next(this.PATCHES); subject.complete();},
    100)

    return subject;
  }

  PATCHES = (patches as any).default;
}


