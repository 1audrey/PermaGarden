import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatchShapeModel } from 'src/app/homepage/garden-canvas/models/iPatchShape-model';
import { PatchesService } from '../../services/patches/patches.service';
import { IPlantsList } from '../models/iplants-model';

@Component({
  selector: 'app-add-to-garden',
  templateUrl: './add-to-garden.component.html',
  styleUrls: ['./add-to-garden.component.css']
})

export class AddToGardenComponent implements OnInit {
  isDirty: boolean = true;
  patches!: IPatchShapeModel[];
  patch!: IPatchShapeModel;
  patchName!: string;
  selectedpatchName!: string;
  isLoaded: boolean = false;
  newAddToGarden: any;

  constructor(
    private router: Router,
    private patchService : PatchesService,
    public dialog: MatDialogRef<AddToGardenComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: IPlantsList
  ) { }

  ngOnInit() {
    this.patchService.getPatchesShape().subscribe(allPatches => {
      this.patches = allPatches;
      this.isLoaded = true;
    });
  }

  cancel() {
    this.dialog.close();
  }

  addOnGardenPage(patchName: string, plant: IPlantsList) {
    this.isDirty = false;
    this.patch = this.patches.find(patch => patch.patchName = patchName);
    this.patchService.savePlantInPatch(this.patch, plant);
    this.dialog.close();
    this.router.navigate(['garden']);
  }

  onSelection() {
    this.patch.patchName;
  }

  createPatch(){
    this.dialog.close();
    this.router.navigate(['garden']);
  }
}


