import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-foundation-shape-dialog',
  templateUrl: './foundation-shape-dialog.component.html',
  styleUrls: ['./foundation-shape-dialog.component.css']
})
export class FoundationShapeDialogComponent {

  length: number;
  width: number;
  foundationName: string;

  constructor(
    private dialogRef: MatDialogRef<FoundationShapeDialogComponent>) { }

  saveFoundationPatch(formValues: any){
    let patchName = formValues.patchName;
    let length = formValues.length;
    let width = formValues.width;
    this.dialogRef.close({length, width, patchName});
  }

}
