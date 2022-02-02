
//import { Injectable } from "@angular/core";
//import { Observable, Subject } from "rxjs";
//import { IPlantsList } from "src/app/garden-list/models/iplants-model";

//@Injectable()
//export class MockPlantsService{
//  getPlants(): Observable<IPlantsList[]>{
//    let subject = new Subject<IPlantsList[]>()
//    setTimeout(() => {subject.next(PLANTS); subject.complete();},
//    100)

//    return subject;
//  }

//  savePlant(newPlant: IPlantsList){
//    PLANTS.push(newPlant)
//  }
//}

//  const PLANTS : IPlantsList[] =
//  [
//    {
//    name: "Spring Onions",
//    startingMethod: 'Sowing in pots',
//    startingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
//    sowingPeriodInDays: 21,
//    harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
//    growingPeriodInDays: 120,
//    plantImagePicture: 'assets/images/spring-onions.jpg',
//    },
//  ];
