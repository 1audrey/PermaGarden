import { Component } from '@angular/core';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements IPiece {

    x!: number;
    y!: number;
    color!: string;
    shape!: number[][];

    constructor(private ctx: CanvasRenderingContext2D) {
     }

     move(pieceToMove: IPiece) {
      this.x = pieceToMove.x;
      this.y = pieceToMove.y;
      this.shape = pieceToMove.shape;
    }

    getPieceShape(shape: string){
      if(shape ==='rectangle'){
        this.shape = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
        this.color = COLORS[1];
        this.x = 0;
        this.y = 0;
      }
      else{
        this.shape = [[2, 2, 2], [2, 2, 2], [2, 2, 2]];
        this.color = COLORS[2];
        this.x = 0;
        this.y = 0;
      }
    }

    draw() {
      this.ctx.fillStyle = this.color;
      this.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value > 0) {
            // this.x & this.y = position on the board
            // x & y position are the positions of the shape
            this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          }
        });
      });
    }
}

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}

export const COLORS = [
  'none',
  '#114b0b',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
