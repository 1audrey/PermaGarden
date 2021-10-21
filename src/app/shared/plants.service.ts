
import { Injectable } from "@angular/core";
import { Observable, Subject} from "rxjs";
import { IPlantsList } from "../garden-list/models/iplants-model";
import * as plants from "./plants-list.json";


@Injectable()
export class PlantsService{

  static PLANTS: any = [];

  constructor(){}

   getPlants(): Observable<IPlantsList[]>{
    let subject = new Subject<IPlantsList[]>()
    setTimeout(() => {subject.next(this.PLANTS); subject.complete();},
    100)

    return subject;
  }

  savePlant(newPlant: IPlantsList){
    this.PLANTS.push(newPlant)
  }

  PLANTS = (plants as any).default;

}



