import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { PlantsService } from '../../services/plants/plants.service';
import { IPlantsImage } from '../models/iplants-image-model';
import { IPlantsList } from '../models/iplants-model';
import { SelectImageDialogComponent } from './select-image-dialog/select-image-dialog.component';



@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.css'],
})

export class AddNewPlantComponent {

  isDirty: boolean = true;
  newPlant!: any;
  imgs: IPlantsImage[] = [];
  plantImagePicture!: string;
  selectedStartingMethods!: string;
  plants!: IPlantsList[];
  static plants: any;

  constructor(private router: Router,
    public dialog: MatDialog,
    private plantService: PlantsService,
    private notifications: NotificationsService,
    private route: ActivatedRoute
  ) { }

  monthData: Month[] = [
    { name: 'January', isChecked: false },
    { name: 'February', isChecked: false },
    { name: 'March', isChecked: false },
    { name: 'April', isChecked: false },
    { name: 'May', isChecked: false },
    { name: 'June', isChecked: false },
    { name: 'July', isChecked: false },
    { name: 'August', isChecked: false },
    { name: 'September', isChecked: false },
    { name: 'October', isChecked: false },
    { name: 'November', isChecked: false },
    { name: 'December', isChecked: false }
  ]

  startingMethods: StartingMethods[] = [
    { value: 'Sowing in pots' },
    { value: 'Sowing in soil' },
    { value: 'Planting' }
  ];

  cancel() {
    this.router.navigate(['plants-list']);
  }

  saveNewPlant(formValues: IPlantsList) {
    this.isDirty = false;

    this.plants = this.route.snapshot.data['plants'];
    for (let plant of this.plants) {
      if (this.checkIfPlantWithSameNameExists(plant.plantName, formValues.plantName)) {
        return;
      }
    }

    if (formValues.plantName === null) {
      this.notifications.showError(`Oops something went wrong, please fill all the required fields`);
    }
    else {
      formValues.plantStartingMonths = formValues.plantStartingMonths.toString();
      formValues.plantHarvestingMonths = formValues.plantHarvestingMonths.toString();
      console.log(formValues);
      this.plantService.saveNewPlant(formValues).subscribe(() => {
        this.notifications.showSuccess(`${formValues.plantName} has been added to your plant list`);
        this.router.navigate(['plants-list']);
      });
    }
  }

  openSelectImageDialog() {
    let dialogRef = this.dialog.open(SelectImageDialogComponent, {
      width: '1000px',
      data: { imageUrl: this.plantImagePicture },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Image Url:', this.plantImagePicture);
      this.plantImagePicture = result;
    })
  }

  private checkIfPlantWithSameNameExists(existingPlantName: string, newPlantName: string): boolean {
    if (existingPlantName.toLowerCase() === newPlantName.toLowerCase()) {
      this.notifications.showWarning(`You already have a plant called ${newPlantName}`);
      return true;
    }
    return false;
  }
}

export interface Month {
  name: string;
  isChecked: boolean;
}

interface StartingMethods {
  value: string;
}

