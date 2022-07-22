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

  ngOnInit() {
    this.plants = this.route.snapshot.data['plants'];
  }

  cancel() {
    this.router.navigate(['plants-list']);
  }

  saveNewPlant(plantFormValue: IPlantsList) {
    this.isDirty = false;

    for (let plant of this.plants) {
      if (this.checkIfPlantWithSameNameExists(plant.plantName, plantFormValue.plantName)) {
        return;
      }
    }

    this.plantService.saveNewPlant(plantFormValue);
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

interface Month {
  name: string;
  isChecked: boolean;
}

interface StartingMethods {
  value: string;
}

