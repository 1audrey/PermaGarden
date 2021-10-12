import { Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPlantsImage } from '../models/iplants-image-model';
import { IPlantsList } from '../models/iplants-model';
import { PlantsService } from '../shared/plants.service';
import { SelectImageDialogComponent } from './select-image-dialog/select-image-dialog.component';
import { NotificationsService } from '../shared/notifications.service';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.css'],
})

export class AddNewPlantComponent {

  isDirty: boolean = true;
  newPlant!: any;
  startingMonths!: string[];
  harvestingMonths!: string[];
  imgs: IPlantsImage[] = [];
  imageUrl!: string;
  selectedStartingMethods!: string;

  constructor(private router: Router,
    public dialog: MatDialog,
    private plantService: PlantsService,
    private notifications: NotificationsService,
  ) { }

  monthData: Month[] = [
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

  startingMethods: StartingMethods[] = [
    { value: 'Sowing in pots' },
    { value: 'Sowing in soil' },
    { value: 'Planting' }
  ];

  cancel() {
    this.router.navigate(['plants-list']);
  }

  savePlant(formValues: IPlantsList) {
    console.log(formValues);
    this.plantService.savePlant(formValues);
    this.isDirty = false;
    if(formValues.name === null ||
      formValues.imageUrl === null ||
      formValues.startingMethod === null ||
      formValues.startingMonths === null ||
      formValues.harvestingMonths === null)
    {
      this.notifications.showError(`Oops something went wrong, try again`);
    }
    else
    {
      this.notifications.showSuccess(`${formValues.name} has been added to your plant list`);
      this.router.navigate(['plants-list']);
    }

  }

  openSelectImageDialog() {
    let dialogRef = this.dialog.open(SelectImageDialogComponent, {
      width: '1000px',
      data: { imageUrl: this.imageUrl },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Image Url:', this.imageUrl);
      this.imageUrl = result;
    })
  }
}


export interface Month {
  name: string;
  isChecked: boolean;
}

interface StartingMethods {
  value: string;
}

