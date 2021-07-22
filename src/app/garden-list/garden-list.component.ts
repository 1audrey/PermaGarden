import { Component, OnInit} from '@angular/core';
import { IPlantsList } from './shared/iplants-model';
import { PlantsService } from './shared/plants.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.css']
})

export class GardenListComponent implements OnInit{
  plants: IPlantsList[] = [];

  constructor(private plantsService: PlantsService, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.plants = this.route.snapshot.data['plants']
  }





}


