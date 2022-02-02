
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject} from "rxjs";
import { IPlantsList } from "../garden-list/models/iplants-model";
import * as plants from "./plants-list.json";


@Injectable()
export class PlantsService{
  baseUrl = 'https://localhost:5001'
  static PLANTS: any = [];

  constructor(private http: HttpClient){}

   getPlants(): Observable<IPlantsList[]>{
    let subject = new Subject<IPlantsList[]>()
    setTimeout(() => {subject.next(this.PLANTS); subject.complete();},
    100)

    return subject;
  }

  savePlant(newPlant: IPlantsList) {
    this.PLANTS.push(newPlant)
  }


   getAllPlants(): Observable <IPlantsList[]> {
     return this.http.get<IPlantsList[]>(this.baseUrl + '/Plants/all-plants');
   }

  PLANTS = (plants as any).default;

}



