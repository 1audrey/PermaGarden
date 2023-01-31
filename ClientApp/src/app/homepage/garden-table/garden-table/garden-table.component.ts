import { Component, OnInit } from '@angular/core';
import { TableGardenService } from 'src/app/services/table-garden/table-garden.service';
import { IGardenArea } from '../../models/garden-area-models';

@Component({
  selector: 'app-garden-table',
  templateUrl: './garden-table.component.html',
  styleUrls: ['./garden-table.component.css']
})
export class GardenTableComponent {

  gardenArea!: IGardenArea;

  get grid(){
    return this.tableService.grid;
  }

  constructor(private tableService: TableGardenService) { }

  saveNewGardenArea(gardenAreaForm: IGardenArea) {
    this.setUpArea(gardenAreaForm.height, gardenAreaForm.width);
  }

  private setUpArea(height: number, width: number) {
    this.tableService.setUpGrid(height, width);
  }

  selectPatchArea(rowIndex: number, columnIndex: number) {
    this.tableService.updateGrid(rowIndex, columnIndex);
  }
}
