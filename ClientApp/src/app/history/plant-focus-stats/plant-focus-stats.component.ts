import { Component, Input, OnInit } from '@angular/core';
import { IPlantsList } from 'src/app/garden-list/models/iplants-model';

@Component({
  selector: 'app-plant-focus-stats',
  templateUrl: './plant-focus-stats.component.html',
  styleUrls: ['./plant-focus-stats.component.css']
})
export class PlantFocusStatsComponent implements OnInit {
  selectedFilter!: string;

  constructor() {
  }


  @Input() selectedPlant!: IPlantsList;



  ngOnInit() {
    console.log(`Focus on Plant: ${this.selectedPlant}`);

  }
}



