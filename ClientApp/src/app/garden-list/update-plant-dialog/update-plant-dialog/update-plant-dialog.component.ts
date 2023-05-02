import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { IPlantsList } from '../../models/iplants-model';

@Component({
  selector: 'app-update-plant-dialog',
  templateUrl: './update-plant-dialog.component.html',
  styleUrls: ['./update-plant-dialog.component.css']
})
export class UpdatePlantDialogComponent {
  updatedPlant!: IPlantsList;
  isDirty= true;

  constructor(private router: Router,
    private plantService: PlantsService,
    public dialog: MatDialogRef<UpdatePlantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: IPlantsList
    ) { }

  cancel() {
    this.router.navigate(['plants-list']);
  }

  updatePlant(formValues: any){
    this.isDirty = false;
    let plantToUpdate : IPlantsList = {
      plantId: this.plant.plantId,
      plantName: this.plant.plantName,
      plantImagePicture: this.plant.plantImagePicture,
      plantStartingMethod: this.plant.plantStartingMethod,
      plantSowingPeriod: formValues.plantSowingPeriod != undefined ? formValues.plantSowingPeriod : this.plant.plantSowingPeriod,
      plantStartingMonths: this.plant.plantStartingMonths,
      plantGrowingPeriod: formValues.plantGrowingPeriod != undefined ? formValues.plantGrowingPeriod : this.plant.plantGrowingPeriod,
      plantHarvestingMonths: this.plant.plantHarvestingMonths
    }
    console.log('plantToUpdate', plantToUpdate);
    this.plantService.updatePlant(plantToUpdate).subscribe();
    this.dialog.close();
  }
}
