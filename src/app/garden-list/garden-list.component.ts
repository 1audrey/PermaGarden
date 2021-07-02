import { Component} from '@angular/core';
import { IPlantsList } from '../iplants-list';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.css'],

  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class GardenListComponent {
  state = 'collapsed';


 plants: Array<IPlantsList> =
 [
   {
   name: "Spring Onions",
   startDate: "23/06/2021",
   sowingMonths: 'March, April, May, June, July, August, September' ,
   sowingPeriodInDays: 21,
   harvestingMonths: 'January, April, June, July, August, September, October',
   harvestingPeriodInDays: 77,
   numberOfSeeds: 80,
   imageURL: 'assets/images/spring-onions.jpg',
   },
  //  {
  //   name: "Spring Onions",
  //   startDate: "23/06/2021",
  //   sowingMonths:  "March, April, May, June, July, August, September" ,
  //   sowingPeriodInDays: 21,
  //   harvestingMonths: "January, April, June, July, August, September, October",
  //   harvestingPeriodInDays: 77,
  //   numberOfSeeds: 80,
  //   imageURL: 'assets/images/spring-onions.jpg',
  //  }

];


  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

}


