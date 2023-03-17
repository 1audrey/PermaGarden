import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPatchShapeModel } from 'src/app/garden/models/iPatchShape-model';

@Component({
  selector: 'app-rectangle-dialog',
  templateUrl: './rectangle-dialog.component.html',
  styleUrls: ['./rectangle-dialog.component.css']
})
export class RectangleDialogComponent{

  length: number;
  width: number;
  patchName: string;
  notification: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {patches: IPatchShapeModel[]},
    private dialogRef: MatDialogRef<RectangleDialogComponent>) { }

  saveRectanglePatch(formValues: any){
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


