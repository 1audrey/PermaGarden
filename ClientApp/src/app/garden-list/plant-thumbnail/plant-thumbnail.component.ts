import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IPlantsList } from '../models/iplants-model';
import { AddToGardenComponent } from '../add-to-garden/add-to-garden.component';
import { MatDialog } from '@angular/material/dialog';

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
export class PlantThumbnailComponent {
  @Input() plant!: IPlantsList;
  @Output() plantDeleted: EventEmitter<any> = new EventEmitter();

  state = 'collapsed';
  todayDate: Date = new Date();
  month = this.todayDate.toLocaleString('default', { month: 'long' });
  startingMethod = 'Plant';

  constructor(public dialog: MatDialog) { }

  isSowingMonthIncluded(month: string): boolean {
    return this.plant.plantStartingMonths.split(',').includes(month);
  }

  isHarvestingMonthIncluded(month: string): boolean{
    return this.plant.plantHarvestingMonths.split(',').includes(month);
  }

  typeOfStarting() {
    if (this.plant.plantStartingMethod.includes("Sowing")) {
      this.startingMethod = 'Sow';
    }
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
    this.typeOfStarting();
  }

  addToGarden(): void {
    this.dialog.open(AddToGardenComponent, {
      width: '250px',
      data: {
        plantId: this.plant.plantId
      }
    });
  }

  delete() {
    this.plantDeleted.emit();
  }

}

