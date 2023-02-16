import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-circle-dialog',
  templateUrl: './circle-dialog.component.html',
  styleUrls: ['./circle-dialog.component.css']
})
export class CircleDialogComponent {

  patchName: string;
  diameter: number;

  constructor(
    private dialogRef: MatDialogRef<CircleDialogComponent>) { }

  saveCirclePatch(formValue: any){
    let patchName = formValue.patchName;
    let diameter = formValue.diameter;
    this.dialogRef.close({patchName, diameter});
  }
}
