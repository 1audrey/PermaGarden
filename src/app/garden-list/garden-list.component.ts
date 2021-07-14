import { Component, OnInit} from '@angular/core';
import { IPlantsList } from '../iplants-list';
import { PlantsService } from './shared/plants.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.css']
})

export class GardenListComponent implements OnInit{
  plants :any[] | undefined ;

  constructor(private plantsService: PlantsService, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.plants = this.route.snapshot.data['plants']
  }





}


