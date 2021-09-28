import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IPlantsList } from '../models/iplants-model';
import { AddToGardenComponent } from '../add-to-garden/add-to-garden.component';
import { MatDialog } from '@angular/material/dialog';
import { PlantImageResolverService } from '../resolver/plant-image-resolver.service';

@Component({
  selector: 'app-plant-thumbnail',
  templateUrl: './plant-thumbnail.component.html',
  styleUrls: ['./plant-thumbnail.component.css'],

  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class PlantThumbnailComponent{

  @Input()  plant!: IPlantsList;

state = 'collapsed';
todayDate : Date = new Date();
month = this.todayDate.toLocaleString('default', { month: 'long' });

constructor(public dialog: MatDialog){}

toggle(): void {
  this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
}

addToGarden(): void{
    this.dialog.open(AddToGardenComponent, {
    width: '250px',
    data: {name: this.plant.name }
  });
}

// ngOnChanges(){
//   if(this.plant)
//   {
//     this.filterPlants(this.filterBy);
//   }
// }

// filterPlants(filter :string){
//   if(filter.length === 11)
//   {
//     return this.visiblePlants.slice(0);
//   }
//   else
//   {
//     return this.visiblePlants.filter(plants => plants.sowingMonths.includes(this.month));

//   }

//   }





};



