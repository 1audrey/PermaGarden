import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.css']
})

export class AddNewPlantComponent implements OnInit{
  isDirty:boolean = true;
  newPlant!: any;

  monthData!: Month [];
  sowingMonths!: string[];
  harvestingMonths!: string[];

  constructor(private router: Router){
  }

  ngOnInit(){
    this.getMonths();
  }

  getMonths(){
    this.monthData=[
  {
    name: 'January',
    isChecked: false
    },
    {
    name: 'February',
    isChecked: false,
    },
    {
    name: 'March',
    isChecked: false,
      },
    {
    name: 'April',
    isChecked: false,
    },
    {
    name: 'May',
    isChecked: false,
    },
    {
    name: 'June',
    isChecked: false,

    },
    {
    name: 'July',
    isChecked: false,
      },
    {
    name: 'August',
    isChecked: false,
    },
    {
    name: 'September',
    isChecked: false,
    },
    {
    name: 'October',
    isChecked: false,
    },
    {
    name: 'November',
    isChecked: false,
      },
    {
    name: 'December',
    isChecked: false,
    },
]
}

cancel(){
  this.router.navigate(['/plants-list']);
}

savePlant(formValues: any){
  console.log(formValues);
}


}


export interface Month {
  name: string;
  isChecked: boolean;
}


