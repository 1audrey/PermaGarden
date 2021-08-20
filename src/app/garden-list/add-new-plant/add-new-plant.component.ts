import { Component, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPlantsImage } from '../models/iplants-image-model';
import { IPlantsList } from '../models/iplants-model';
import { PlantsService } from '../shared/plants.service';
import { SelectImageDialogComponent } from './select-image-dialog/select-image-dialog.component';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.css']
})

export class AddNewPlantComponent{
  isDirty:boolean = true;
  newPlant!: any;
  sowingMonths!: string[];
  harvestingMonths!: string[];
  imgs: IPlantsImage[] = [];
  imageURL!: string;



  constructor(private router: Router, public dialog: MatDialog, private plantService: PlantsService){
  }

   monthData: Month [] =[
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
    }]

  cancel(){
  this.router.navigate(['/plants-list']);
  }

  savePlant(formValues: IPlantsList){
  console.log(formValues)
  this.plantService.savePlant(formValues);
  this.isDirty = false;
  this.router.navigate(['/plants-list']);
  }

  openSelectImageDialog(){
    let dialogRef = this.dialog.open(SelectImageDialogComponent, {
    width: '1000px',
    data: {imageURL: this.imageURL},
    autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Image Url:', this.imageURL);
      this.imageURL = result;
    })
  }
}


export interface Month {
  name: string;
  isChecked: boolean;
}



