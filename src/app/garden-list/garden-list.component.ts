import { Component} from '@angular/core';
import { IPlantsList } from '../iplants-list';



@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.css']
})
export class GardenListComponent {

 plants: Array<IPlantsList> =
 [
   {
   name: "Spring Onions",
   startDate: "23/06/2021",
   sowingMonths: 'March, April, May, June, July, August, September' ,
   sowingPeriodInDays: 21,
   harvestingMonths: 'January, April, June, July, August, September, October',
   harvestingPeriodInDays: 120,
   numberOfSeeds: 80,
   imageURL: 'assets/images/spring-onions.jpg',
   },

   {
    name: "Carrots",
    startDate: "20/06/2021",
    sowingMonths: 'Febraury, March, April, May, June, July' ,
    sowingPeriodInDays: 21,
    harvestingMonths: 'May, June, July, August, September, October',
    harvestingPeriodInDays: 77,
    numberOfSeeds: 80,
    imageURL: 'assets/images/carrots.jpg',
    },

];




}


