import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as patches from "./patch-list.json";
import { ITask } from '../../task/models/itask-model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IPlantInPatch } from '../../garden/models/iplantinpatch-model';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';
import { NotificationsService } from '../notifications/notifications.service';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';
import { IGardenArea } from 'src/app/homepage/models/garden-area-models';
import { IPatchChangesModel } from 'src/app/homepage/models/patch-changes-model';

@Injectable()
export class PatchesService {
  baseUrl = 'https://localhost:5001/Patches/';

  patch!: IPatchShapeModel;
  static PATCHES: any = [];
  today = new Date();
  nextDate!: any;
  todayDate!: any;
  diffInDays!: number;
  nextTaskEvent!: false;
  allTasks!: ITask[];

  constructor(private http: HttpClient, private notifications: NotificationsService) { }

  patchToDelete(patchName: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('patchName', patchName);

    console.log('params for patch deleted', params);
    console.log('url  for patch deleted', this.baseUrl + 'delete-patch', { params: params });

    console.log(`Deleting the ${patchName} from the patch service`);
    return this.http.delete<string>(this.baseUrl + 'delete-patch', { params: params }).pipe(
      tap(() => console.log(`Patch service deleted ${patchName} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  savePlantInPatch(patch: IPatchShapeModel, plant: IPlantsList) {
    const plantInPatch =
    {
      patchId: patch.patchId,
      patchName: patch.patchName,
      plantId: plant.plantId
    }
    this.setPlantInPatch(plantInPatch).subscribe(() => {
      this.notifications.showSuccess(`${plant.plantName} has been add to the patch:' ${patch.patchName}'`);
    });
  }

  setPlantInPatch(plantInPatch: IPlantInPatch): Observable<IPlantInPatch> {
    console.log(`Setting the ${plantInPatch.plantId} from the patch service`);
    return this.http.post<IPlantInPatch>(this.baseUrl + 'save-plant-in-patch', plantInPatch).pipe(
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

  saveCircleAndImagePatch(patchName: string, diameter: number, xPosition: number, yPosition: number, shape:string, imagePicture, rotationAngle: number) {
    const patchShape: IPatchShapeModel = {
      patchName: patchName,
      diameter: diameter,
      xPosition: xPosition,
      yPosition: yPosition,
      shape: shape,
      patchImagePicture: imagePicture,
      rotationAngle: rotationAngle
    }

    this.savePatchShapeModel(patchShape).subscribe();
  }

  saveRectanglePatch(patchName: string, width: number, length: number, xPosition: number, yPosition: number, shape: string, imagePicture: string, rotationAngle: number) {
    const patchShape: IPatchShapeModel = {
      patchName: patchName,
      xPosition: xPosition,
      yPosition: yPosition,
      shape: shape,
      patchImagePicture: imagePicture,
      width : width,
      length : length,
      rotationAngle: rotationAngle
    }

    this.savePatchShapeModel(patchShape).subscribe();
  }

  private savePatchShapeModel(patchShape:IPatchShapeModel){
    console.log(`Setting the dimensions of the SVG from the patch service`);
    return this.http.post<IPatchShapeModel>(this.baseUrl + 'save-patch-shape', patchShape).pipe(
      tap(() => console.log(`Patch service added ${patchShape} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getPatchesShape(): Observable<IPatchShapeModel[]> {
    return this.http.get<IPatchShapeModel[]>(this.baseUrl + 'get-patches-shapes');
  }

  getASinglePatchShape(patchName: string): Observable<IPatchShapeModel[]> {
    return this.http.get<IPatchShapeModel[]>(this.baseUrl + `${patchName}`);
  }

  saveSvgDimensions(area: IGardenArea) {
    console.log(`Setting the dimensions of the SVG from the patch service`);
    return this.http.post<IGardenArea>(this.baseUrl + 'save-svg', area).pipe(
      tap(() => console.log(`Patch service added ${area} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSvgDimensions(): Observable<IGardenArea[]> {
    return this.http.get<IGardenArea[]>(this.baseUrl + 'get-svg');
  }

  saveGardenBorder(points: number[][]) {
    console.log(`Setting the border of the garden from the patch service`);
    return this.http.post<number[][]>(this.baseUrl + 'save-border', points ).pipe(
      tap(() => console.log(`Patch service added ${points} successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getGardenBorder(): Observable<Array<[number, number]>> {
    return this.http.get<Array<[number, number]>>(this.baseUrl + 'get-garden-border');
  }

  saveUpdatedPatches(patchesToSave: IPatchChangesModel[]){
    return this.http.put<IPatchChangesModel[]>(this.baseUrl + 'updated-patch', patchesToSave).pipe(
      tap(() => console.log(`Patch service edited updated patches successfully`)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  PATCHES = (patches as any).default;
}
