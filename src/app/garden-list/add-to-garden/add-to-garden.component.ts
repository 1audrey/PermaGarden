import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { IPlantsList } from '../models/iplants-model';

@Component({
  selector: 'app-add-to-garden',
  templateUrl: './add-to-garden.component.html',
  styleUrls: ['./add-to-garden.component.css']
})

export class AddToGardenComponent implements OnInit {
  public static readonly CREATEPATCH_WEBSITE_URL: string = '/create-patch';

  addToGardenForm: any;
  isDirty: boolean = true;
  patches: IPatch[] = [];
  patch!: IPatch;
  patchName!:string;
  patchControl = new FormControl('', Validators.required);
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private patchService : PatchesService,
    public dialog: MatDialogRef<AddToGardenComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: IPlantsList
  ) { }

  ngOnInit(): void {
    this.patchService.getPatch().subscribe(result => {
      this.patches = result;
      this.isLoading = true;
    });
  }

  cancel() {
    this.dialog.close();
  }

  addOnGardenPage(patchName: string, plant:IPlantsList) {
    this.isDirty = false;
      console.log(this.plant);
      console.log(this.patchName);
      this.patchService.savePlantInPatch(patchName, plant);
      this.dialog.close();
      this.router.navigate(['garden-footprint']);
  }

  onSelection() {
    this.patchName;
    }

  createPatch(){
    const link = document.createElement('a');
    link.href = AddToGardenComponent.CREATEPATCH_WEBSITE_URL;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }





}


