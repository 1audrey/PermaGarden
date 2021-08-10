import { Component, OnInit} from '@angular/core';
import { IPlantsList } from './shared/iplants-model';
import { PlantsService } from './shared/plants.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})

export class PlantsListComponent implements OnInit{
  plants: IPlantsList[] = [];

  constructor(private plantsService: PlantsService, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.plants = this.route.snapshot.data['plants']
  }





}


