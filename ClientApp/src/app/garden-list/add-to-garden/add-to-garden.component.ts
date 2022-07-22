import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from '../../services/patches/patches.service';
import { IPlantsList } from '../models/iplants-model';

@Component({
  selector: 'app-add-to-garden',
  templateUrl: './add-to-garden.component.html',
  styleUrls: ['./add-to-garden.component.css']
})

export class AddToGardenComponent implements OnInit {
  isDirty: boolean = true;
  patches!: IPatch[];
  patch!: IPatch;
  patchName!:string;
  patchControl = new FormControl('', Validators.required);
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private patchService : PatchesService,
    public dialog: MatDialogRef<AddToGardenComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: IPlantsList
  ) { }

  ngOnInit() {
    this.patchService.getAllPatches().subscribe(allPatches => {
      this.patches = allPatches;
      this.isLoaded = true;
    });
  }

  cancel() {
    this.dialog.close();
  }

  addOnGardenPage(patch: IPatch, plant: IPlantsList) {
    this.isDirty = false;
    this.patchService.savePlantInPatch(patch, plant);
    this.dialog.close();
    this.router.navigate(['garden']);
  }

  onSelection() {
    this.patchName;
  }

  createPatch(){
    this.dialog.close();
    this.router.navigate(['create-patch']);
  }
}


