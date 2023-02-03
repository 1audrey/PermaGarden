import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableGardenService {

  grid: number[][] = [[]];

  setUpGrid(height: number, width: number){
    const gridFilled: number[][] = new Array(height)
    .fill(0)
    .map(() =>
      new Array(width).fill(0)
    );

    this.grid = gridFilled;
  }

  updateGrid(rowIndex: number, columnIndex:number){
    if (rowIndex < 0 || rowIndex > this.grid.length || columnIndex < 0 || columnIndex > this.grid.length){
    }

    if(this.grid[rowIndex][columnIndex] == 0){
      this.grid[rowIndex][columnIndex] = 1;
    }

    else this.grid[rowIndex][columnIndex] = 0;
  }
}
