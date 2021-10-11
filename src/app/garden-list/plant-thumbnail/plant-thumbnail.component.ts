import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IPlantsList } from '../models/iplants-model';
import { AddToGardenComponent } from '../add-to-garden/add-to-garden.component';
import { MatDialog } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

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
  @Output() plantDeleted: EventEmitter<any> = new EventEmitter();

state = 'collapsed';
todayDate : Date = new Date();
month = this.todayDate.toLocaleString('default', { month: 'long' });
isStartingMethod= 'Plant';


constructor(public dialog: MatDialog){}

typeOfStarting(){
  if(this.plant.startingMethod.includes("Sowing"))
  {
    this.isStartingMethod = 'Sow';
  }
}

toggle(): void {
  this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  this.typeOfStarting();
}

addToGarden(): void{
    this.dialog.open(AddToGardenComponent, {
    width: '250px',
    data: {name: this.plant.name }
  });
}

delete(){
  this.plantDeleted.emit();

}


}

