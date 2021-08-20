
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IPlantsList } from "../models/iplants-model";

@Injectable()
export class PlantsService{
  getPlants(): Observable<IPlantsList[]>{
    let subject = new Subject<IPlantsList[]>()
    setTimeout(() => {subject.next(PLANTS); subject.complete();},
    100)

    return subject;
  }



  savePlant(newPlant: IPlantsList){
    PLANTS.push(newPlant)
  }

}
  const PLANTS : IPlantsList[] =
  [
    {
    name: "Spring Onions",
    sowingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
    sowingPeriodInDays: 21,
    harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
    harvestingPeriodInDays: 120,
    imageURL: 'assets/images/spring-onions.jpg',
    },

    {
     name: "Carrots",
     sowingMonths: ["February", "March", "April", "May", "June", "July"] ,
     sowingPeriodInDays: 21,
     harvestingMonths: ["May", "June", "July", "August", "September", "October"],
     harvestingPeriodInDays: 77,
     imageURL: 'assets/images/carrots.jpg',
     },

     {
      name: "Spring Onions",
      sowingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
      sowingPeriodInDays: 21,
      harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
      harvestingPeriodInDays: 120,
      imageURL: 'assets/images/spring-onions.jpg',
      },

      {
        name: "Carrots",
        sowingMonths: ["February", "March", "April", "May", "June", "July"] ,
        sowingPeriodInDays: 21,
        harvestingMonths: ["May", "June", "July", "August", "September", "October"],
        harvestingPeriodInDays: 77,
        imageURL: 'assets/images/carrots.jpg',
        },


 ];



