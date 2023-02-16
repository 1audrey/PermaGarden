import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-shape-dialog',
  templateUrl: './image-shape-dialog.component.html',
  styleUrls: ['./image-shape-dialog.component.css']
})
export class ImageShapeDialogComponent {
  patchName: string;

  constructor(
    private dialogRef: MatDialogRef<ImageShapeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {image: string}) { }

  saveImagePatch(formValues: any){
    let diameter = formValues.diameter;
    let patchName = formValues.patchName;
    this.dialogRef.close({diameter, patchName});
  }
}


