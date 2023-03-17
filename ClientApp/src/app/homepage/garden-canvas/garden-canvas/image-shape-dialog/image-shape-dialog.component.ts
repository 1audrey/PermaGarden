import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';

@Component({
  selector: 'app-image-shape-dialog',
  templateUrl: './image-shape-dialog.component.html',
  styleUrls: ['./image-shape-dialog.component.css']
})
export class ImageShapeDialogComponent {
  patchName: string;
  notification: string;

  constructor(
    private dialogRef: MatDialogRef<ImageShapeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {image: string, patches: IPatchShapeModel[]}) { }

  saveImagePatch(formValues: any){
    for (let patch of this.data.patches) {
      if (this.checkIfPatchWithSameNameExists(patch.patchName, formValues.patchName)) {
        return;
      }
    }

    let diameter = formValues.diameter;
    let patchName = formValues.patchName;
    this.dialogRef.close({diameter, patchName});
  }

  cancel(){
    this.dialogRef.close();
    }

  private checkIfPatchWithSameNameExists(existingPatchName: string, newPatchName: string): boolean {
    if (existingPatchName.toLowerCase() === newPatchName.toLowerCase()) {
      this.notification = `You already have a patch called ${newPatchName}`;
      return true;
    }
    return false;
  }
}


