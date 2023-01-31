import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableGardenService {

  grid: number[][] = [[]];

  setUpGrid(height: number, width: number){
    const gridtest: number[][] = new Array(height)
    .fill(0)
    .map(() =>
      new Array(width).fill(0)
    );

    this.grid = gridtest;
  }

  updateGrid(rowIndex: number, columnIndex:number){
    console.log('grid[row][column]', this.grid[rowIndex][columnIndex]);

    if (rowIndex < 0 || rowIndex > this.grid.length || columnIndex < 0 || columnIndex > this.grid.length){
      console.log('Error');
    }

    if(this.grid[rowIndex][columnIndex] == 0){
      this.grid[rowIndex][columnIndex] = 1;
      console.log('this.grid[rowIndex]', this.grid[rowIndex])
    }

    else this.grid[rowIndex][columnIndex] = 0;
  }
}
