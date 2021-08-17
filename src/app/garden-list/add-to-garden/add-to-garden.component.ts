import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IPlantsList } from '../models/iplants-model';

@Component({
  selector: 'app-add-to-garden',
  templateUrl: './add-to-garden.component.html',
  styleUrls: ['./add-to-garden.component.css']
})

export class AddToGardenComponent  {
isDirty: boolean = true;
newPlant: any;
plants: IPlantsList[] = [];


  constructor(private router: Router,
    public dialog: MatDialogRef<AddToGardenComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: IPlantsList
    ) { }


  cancel(){
    this.dialog.close();
  }

  addOnGardenPage(){
    return console.log(`added ${this.plant.name}`);

  }




}


