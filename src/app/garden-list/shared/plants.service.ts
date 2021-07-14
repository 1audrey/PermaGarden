import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class PlantsService{
  getPlants(){
    let subject = new Subject
    setTimeout(() => {subject.next(PLANTS); subject.complete();},
    100)

    return subject;
  }
}
  const PLANTS =
  [
    {
    name: "Spring Onions",
    startDate: "23/06/2021",
    sowingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
    sowingPeriodInDays: 21,
    harvestingMonths: 'January, April, June, July, August, September, October',
    harvestingPeriodInDays: 120,
    numberOfSeeds: 80,
    imageURL: 'assets/images/spring-onions.jpg',
    },

    {
     name: "Carrots",
     startDate: "20/06/2021",
     sowingMonths: ["February", "March", "April", "May", "June", "July"] ,
     sowingPeriodInDays: 21,
     harvestingMonths: 'May, June, July, August, September, October',
     harvestingPeriodInDays: 77,
     numberOfSeeds: 80,
     imageURL: 'assets/images/carrots.jpg',
     },

 ];

