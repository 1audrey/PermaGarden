import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPatchShapeModel } from 'src/app/homepage/garden-canvas/models/iPatchShape-model';

@Component({
  selector: 'app-foundation-shape-dialog',
  templateUrl: './foundation-shape-dialog.component.html',
  styleUrls: ['./foundation-shape-dialog.component.css']
})
export class FoundationShapeDialogComponent {

  length: number;
  width: number;
  foundationName: string;
  notification: string;

  constructor(
    private dialogRef: MatDialogRef<FoundationShapeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {patches: IPatchShapeModel[]}) { }

  saveFoundationPatch(formValues: any){
    for (let patch of this.data.patches) {
      if (this.checkIfPatchWithSameNameExists(patch.patchName, formValues.patchName)) {
        return;
      }
    }
    let patchName = formValues.patchName;
    let length = formValues.length;
    let width = formValues.width;
    this.dialogRef.close({length, width, patchName});
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
