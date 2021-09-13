import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { IPlantsImage } from '../../models/iplants-image-model';
import { PlantImageService } from '../../shared/plant-image.service';


@Component({
  selector: 'app-select-image-dialog',
  templateUrl: './select-image-dialog.component.html',
  styleUrls: ['./select-image-dialog.component.css']
})
export class SelectImageDialogComponent implements OnInit {
  imgs: IPlantsImage[] = [];
  imageUrl!:string ;
  search='';

  @ViewChild(MatSelectionList, {static: true}) imageSelected!: MatSelectionList;

  constructor(
    private _imgService: PlantImageService,
    private dialogRef: MatDialogRef<SelectImageDialogComponent>,
    ) {}

  ngOnInit(): void {
    this._imgService.getPlantsImage().subscribe(result => {
      this.imgs = result;
    });

    this.imageSelected.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  save() {
    this.dialogRef.close((this.imageSelected._value)?.toString());
  }

  cancel(){
  this.dialogRef.close();
  }
}