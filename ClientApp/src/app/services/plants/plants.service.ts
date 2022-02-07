
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError} from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IPlantsList } from "../../garden-list/models/iplants-model";


@Injectable()
export class PlantsService{
  baseUrl = 'https://localhost:5001/Plants/'

  constructor(private http: HttpClient){}

  saveNewPlant(plant: IPlantsList): Observable<IPlantsList> {
    console.log(`Setting the ${plant.plantName} from the plant service`);
    return this.http.post<IPlantsList>(this.baseUrl + 'save-plant', plant).pipe(
      tap(() => console.log('Plant service add new plant success')),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

   getAllPlants(): Observable <IPlantsList[]> {
     return this.http.get<IPlantsList[]>(this.baseUrl + 'all-plants');
  }

  plantToDelete(plantName: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('plantName', plantName);

    console.log(`Deleting the ${plantName} from the plant service`);
    return this.http.delete<string>(this.baseUrl + 'delete-plant', { params: params }).pipe(
      tap(() => console.log('Plant service delete plant success')),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

}



