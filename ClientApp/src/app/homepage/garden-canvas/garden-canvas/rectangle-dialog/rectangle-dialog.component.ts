import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rectangle-dialog',
  templateUrl: './rectangle-dialog.component.html',
  styleUrls: ['./rectangle-dialog.component.css']
})
export class RectangleDialogComponent {

  length: number;
  width: number;
  patchName: string;

  constructor(
    private dialogRef: MatDialogRef<RectangleDialogComponent>) { }

  saveRectanglePatch(formValues: any){
    let patchName = formValues.patchName;
    let length = formValues.length;
    let width = formValues.width;
    this.dialogRef.close({length, width, patchName});
  }

}
