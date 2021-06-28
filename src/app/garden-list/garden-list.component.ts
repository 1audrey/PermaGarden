import { Component } from '@angular/core';
import { MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.css']
})
export class GardenListComponent {

 plants = {
   name: "Spring Onions",
   startDate: "23/06/2021",
   sowingMonths: { months: "March, April, May, June, July, August, September" },
   sowingPeriodInDays: 21,
   harvestingMonths: {months: "January, April, June, July, August, September, October"},
   harvestingPeriodInDays: 77,
   numberOfSeeds: 80,
   imageURL: 'assets/images/spring-onions.jpg',
 }

}
