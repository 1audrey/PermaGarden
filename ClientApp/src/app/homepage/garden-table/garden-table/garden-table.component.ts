import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TableGardenService } from 'src/app/services/table-garden/table-garden.service';
import { IGardenArea } from '../../models/garden-area-models';

@Component({
  selector: 'app-garden-table',
  templateUrl: './garden-table.component.html',
  styleUrls: ['./garden-table.component.css']
})
export class GardenTableComponent {

  gardenArea!: IGardenArea;
  cellsSelectedOnCtrl: number[][] = [];
  cellsSelectedOnShift: number[][] = [];

  get grid() {
    return this.tableService.grid;
  }

  @ViewChildren("cell", { read: ElementRef }) cells: QueryList<ElementRef> = null;

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

  select(event: MouseEvent, rowIndex: number, columnIndex: number) {
    let cellSelected = [rowIndex, columnIndex];

    if (event.ctrlKey) {
      this.cellsSelectedOnShift = [];
      this.cellsSelectedOnCtrl.push(cellSelected);
    }

    else if (event.shiftKey) {
      this.cellsSelectedOnCtrl = [];
      if (this.cellsSelectedOnShift.length < 2){
        this.cellsSelectedOnShift.push(cellSelected);
      }
      else {
        for( let index = 1; index < this.cellsSelectedOnShift.length; index ++){
          this.cellsSelectedOnShift[1] = cellSelected;
        }
      }
    }

    else {
      this.cellsSelectedOnCtrl = [];
      this.cellsSelectedOnShift = [];
      this.tableService.updateGrid(rowIndex, columnIndex);
    }
  }

  isSelected(rowIndex: number, columnIndex: number): boolean {
    let isCellSeleted: boolean;

    this.cellsSelectedOnCtrl.forEach((cell) => {
      if (cell[0] === rowIndex && cell[1] === columnIndex) {
        isCellSeleted = true;
      }
      else isCellSeleted = false;
    });

    return isCellSeleted;
  }

  selectShapeOptions() {
    console.log('fake context is called');
    ///will do something else later with patch shape
    this.updateCells();
  }

  private updateCells() {
    if(this.cellsSelectedOnCtrl.length > 0){
      this.updateGridForSelectedCells();
      this.cellsSelectedOnCtrl = [];

    }
    if(this.cellsSelectedOnShift.length > 0){
      this.addAllTheCells();
      this.removeInitialShiftSelection();
      this.updateGridForSelectedCells();
      this.cellsSelectedOnShift = [];
    }
  }

  private addAllTheCells() {
    if (this.areCellsSelectedTopLeftToBottomRight()) {
      for (let i = 0; i <= this.cellsSelectedOnShift[1][0] - this.cellsSelectedOnShift[0][0]; i++) {
        for (let j = 0; j <= this.cellsSelectedOnShift[1][1] - this.cellsSelectedOnShift[0][1] ; j++) {
          let newRowIndex = this.cellsSelectedOnShift[0][0] + i;
          let newColumnIndex = this.cellsSelectedOnShift[0][1] + j;

          this.addCellToSelectedCells(newRowIndex, newColumnIndex)
        }
      }
    }
    else if (this.areCellsSelectedBottomLeftToTopRight()){
      for (let i = 0; i <= this.cellsSelectedOnShift[0][0] - this.cellsSelectedOnShift[1][0]; i++) {
        for (let j = 0; j <= this.cellsSelectedOnShift[1][1] - this.cellsSelectedOnShift[0][1]; j++) {
          let newRowIndex = this.cellsSelectedOnShift[1][0] + i;
          let newColumnIndex = this.cellsSelectedOnShift[0][1] + j;

          this.addCellToSelectedCells(newRowIndex, newColumnIndex)
        }
      }
    }
      else if (this.areCellsSelectedBottomRightToTopLeft()){
        for (let i = 0; i <= this.cellsSelectedOnShift[0][0] - this.cellsSelectedOnShift[1][0]; i++) {
          for (let j = 0; j <= this.cellsSelectedOnShift[0][1] - this.cellsSelectedOnShift[1][1]; j++) {
            let newRowIndex = this.cellsSelectedOnShift[1][0] + i;
            let newColumnIndex = this.cellsSelectedOnShift[1][1] + j;

            this.addCellToSelectedCells(newRowIndex, newColumnIndex)
          }
        }
      }
      else{
        for (let i = 0; i <= this.cellsSelectedOnShift[1][0] - this.cellsSelectedOnShift[0][0]; i++) {
          for (let j = 0; j <= this.cellsSelectedOnShift[0][1] - this.cellsSelectedOnShift[1][1]; j++) {
            let newRowIndex = this.cellsSelectedOnShift[0][0] + i;
            let newColumnIndex = this.cellsSelectedOnShift[1][1] + j;

            this.addCellToSelectedCells(newRowIndex, newColumnIndex)
      }
    }
  }
}


  removeInitialShiftSelection(){
    this.cellsSelectedOnShift.splice(0, 1);
    this.cellsSelectedOnShift.splice(0, 1);
  }

  private updateGridForSelectedCells() {
    if (this.cellsSelectedOnCtrl.length > 0) {
      this.cellsSelectedOnCtrl.forEach((cell) => {
        this.tableService.updateGrid(cell[0], cell[1]);
      })
    }
    else {
      this.cellsSelectedOnShift.forEach((cell) => {
        this.tableService.updateGrid(cell[0], cell[1]);
      })
    }
  }

  private addCellToSelectedCells(newRowIndex: number, newColumnIndex: number){
    let cellSelected = [newRowIndex, newColumnIndex];
    this.cellsSelectedOnShift.push(cellSelected);
  }

  private areCellsSelectedTopLeftToBottomRight(): boolean{
    return this.cellsSelectedOnShift[0][0] <= this.cellsSelectedOnShift[1][0] &&
    this.cellsSelectedOnShift[0][1] <= this.cellsSelectedOnShift[1][1];
  }

  private areCellsSelectedBottomLeftToTopRight(): boolean{
    return this.cellsSelectedOnShift[0][0] >= this.cellsSelectedOnShift[1][0] &&
    this.cellsSelectedOnShift[0][1] <= this.cellsSelectedOnShift[1][1]
  }

  private areCellsSelectedBottomRightToTopLeft(): boolean{
    return this.cellsSelectedOnShift[0][0] >= this.cellsSelectedOnShift[1][0] &&
    this.cellsSelectedOnShift[0][1] >= this.cellsSelectedOnShift[1][1]
  }
}
