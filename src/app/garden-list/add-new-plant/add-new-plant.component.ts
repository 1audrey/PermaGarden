import { Component} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPlantsImage } from '../models/iplants-image-model';
import { SelectImageDialogComponent } from './select-image-dialog/select-image-dialog.component';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.css']
})

export class AddNewPlantComponent {
  isDirty:boolean = true;
  newPlant!: any;
  sowingMonths!: string[];
  harvestingMonths!: string[];
  imgs: IPlantsImage[] = [];
  imageURL!: string;


  constructor(private router: Router, public dialog: MatDialog){
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

  savePlant(formValues: any){
  console.log(formValues);
  }

  openSelectImageDialog(){

    let dialogRef = this.dialog.open(SelectImageDialogComponent, {
    width: '500px',
    data: {imageURL: this.imageURL}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.imageURL= result;
      console.log(this.imageURL);
    })



  }

}


export interface Month {
  name: string;
  isChecked: boolean;
}



