import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';

@Component({
  selector: 'app-circle-dialog',
  templateUrl: './circle-dialog.component.html',
  styleUrls: ['./circle-dialog.component.css']
})
export class CircleDialogComponent {

  patchName: string;
  diameter: number;
  notification: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {patches: IPatchShapeModel[]},
    private dialogRef: MatDialogRef<CircleDialogComponent>) { }

  saveCirclePatch(formValues: any){
    for (let patch of this.data.patches) {
      if (this.checkIfPatchWithSameNameExists(patch.patchName, formValues.patchName)) {
        return;
      }
    }
    let patchName = formValues.patchName;
    let diameter = formValues.diameter;
    this.dialogRef.close({patchName, diameter});
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
