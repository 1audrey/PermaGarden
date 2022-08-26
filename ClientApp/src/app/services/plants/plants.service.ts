import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError} from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IPlantsList } from "../../garden-list/models/iplants-model";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class PlantsService{
  baseUrl = 'https://localhost:5001/Plants/'

  constructor(private http: HttpClient, private notifications: NotificationsService, private router: Router){}

  saveNewPlant(plant: IPlantsList) {
    plant.plantStartingMonths = plant.plantStartingMonths.toString();
    plant.plantHarvestingMonths = plant.plantHarvestingMonths.toString();

    this.setNewPlantSaved(plant).subscribe(() =>{
      this.notifications.showSuccess(`${plant.plantName} has been added to your plant list`);
      this.router.navigate(['plants-list']);
    });
  }

   getAllPlants(): Observable <IPlantsList[]> {
     return this.http.get<IPlantsList[]>(this.baseUrl + 'all-plants');
  }

  setNewPlantSaved(plant: IPlantsList): Observable<IPlantsList>{
    console.log(`Setting the ${plant.plantName} from the plant service`);
    return this.http.post<IPlantsList>(this.baseUrl + 'save-plant', plant).pipe(
      tap(() => console.log('Plant service add new plant success')),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setDeletedPlant(plantName: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('plantName', plantName);

    console.log(`Deleting the ${plantName} from the plant service`);
    return this.http.delete<string>(this.baseUrl + 'delete-plant', { params: params }).pipe(
      tap(() => console.log('Plant service delete plant success')),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  plantToDelete(plantName: string){
    this.setDeletedPlant(plantName).subscribe(() => {
      this.notifications.showSuccess(`${plantName} has been deleted`);
    })
  }

  getSinglePlant(plantId: number): Observable<IPlantsList[]>{
    console.log(`Setting the plant for plant id ${plantId} from the plant service`);
    return this.http.get<IPlantsList[]>(this.baseUrl + `${plantId}`).pipe(
      tap(() => console.log('Plant service get plant successfully')),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}



