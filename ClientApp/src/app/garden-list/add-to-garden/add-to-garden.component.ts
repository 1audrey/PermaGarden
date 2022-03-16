import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { IPlantInPatch } from '../../garden/models/iplantinpatch-model';
import { PatchesService } from '../../services/patches/patches.service';

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
  patches!: IPatch[];
  patch!: IPatch;
  patchName!:string;
  patchControl = new FormControl('', Validators.required);
  selectedPatch!: IPatch;
  public isLoading: boolean = false;
  plantInPatch!: IPlantInPatch;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patchService : PatchesService,
    public dialog: MatDialogRef<AddToGardenComponent>,
    @Inject(MAT_DIALOG_DATA) public plant: IPlantsList
  ) { }

  ngOnInit(): void {
    this.patchService.getAllPatches().subscribe(allPatches => {
      this.patches = allPatches;
      this.isLoading = true;
    });
  }

  cancel() {
    this.dialog.close();
  }

  addOnGardenPage(patch: IPatch, plant: IPlantsList) {
    this.isDirty = false;
    this.plantInPatch =
    {
      patchId: patch.patchId,
      patchName: patch.patchName,
      plantId: plant.plantId
    }
    this.patchService.savePlantInPatch(this.plantInPatch).subscribe(() => {
      this.dialog.close();
      this.router.navigate(['garden']);
    });
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


