import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { IPlantsList } from '../shared/iplants-model';
import { Observable } from 'rxjs';

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
  @Input()
  plant!: IPlantsList;

state = 'collapsed';
todayDate : Date = new Date();
month = this.todayDate.toLocaleString('default', { month: 'long' });


toggle(): void {
  this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
}

}




