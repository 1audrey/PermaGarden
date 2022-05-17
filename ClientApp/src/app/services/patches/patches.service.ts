import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import * as patches from "./patch-list.json";
import { IPatch } from '../../garden/models/ipatch-model';
import { ITask } from '../../task/models/itask-model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IPlantInPatch } from '../../garden/models/iplantinpatch-model';

@Injectable()
export class PatchesService {
  baseUrl = 'https://localhost:5001/Patches/';

  patch!: IPatch;
  static PATCHES: any = [];
  today = new Date();
  nextDate!: any;
  todayDate!: any;
  diffInDays!: number;
  nextTaskEvent!: false;
  allTasks!: ITask[];


  constructor(private http: HttpClient) { }

  getASinglePatch(patchName: string): Observable<IPatch[]> {
    return this.http.get<IPatch[]>(this.baseUrl + `${patchName}`);
  }

  getAllPatches(): Observable<IPatch[]> {
    return this.http.get<IPatch[]>(this.baseUrl + 'all-patches');
  }

  saveNewPatch(patch: IPatch): Observable<IPatch> {
    console.log(`Setting the ${patch.patchName} from the patch service`);
    return this.http.post<IPatch>(this.baseUrl + 'save-patch', patch).pipe(
      tap(() => console.log(`Patch service added ${patch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editPatch(patch: IPatch): Observable<IPatch> {
    console.log(`Editing the ${patch.patchName} from the patch service`);
    return this.http.put<IPatch>(this.baseUrl + 'edit-patch', patch).pipe(
      tap(() => console.log(`Patch service edited ${patch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  patchToDelete(patchName: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('patchName', patchName);

    console.log(`Deleting the ${patchName} from the patch service`);
    return this.http.delete<string>(this.baseUrl + 'delete-patch', { params: params }).pipe(
      tap(() => console.log(`Patch service deleted ${patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  savePlantInPatch(plantInPatch: IPlantInPatch): Observable<IPlantInPatch> {
    console.log(`Setting the ${plantInPatch.plantId} from the patch service`);
    return this.http.post<IPlantInPatch>(this.baseUrl + 'save-plant-in-patch', plantInPatch ).pipe(
      tap(() => console.log(`Patch service added ${plantInPatch.plantId} to ${plantInPatch.patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deletePlantInPatch(plantId: number, patchId: number): Observable<any> {
    console.log(`Deleting the ${plantId} from the patch service`);
    return this.http.delete<any>(this.baseUrl + 'delete-plant-in-patch', { params: { plantId: plantId, patchId: patchId } }).pipe(
      tap(() => console.log(`Patch service deleted ${plantId} from ${patchId} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

 

  saveHarvestedTaskInPatch(form: any){
    var newHarvestedPatches: IPatch[] = [];

    for (let patch of this.PATCHES) {
      if (patch.name === form.patchName ) {
        patch.tasklist.push(form);
        console.log(patch);
      }
      newHarvestedPatches.push(patch);
    }
    this.PATCHES = newHarvestedPatches;
  }


  PATCHES = (patches as any).default;
}


