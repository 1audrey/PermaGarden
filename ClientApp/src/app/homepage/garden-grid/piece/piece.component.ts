import { Component, OnInit } from '@angular/core';

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
        this.getPieceShape()
     }

     move(pieceToMove: IPiece) {
      this.x = pieceToMove.x;
      this.y = pieceToMove.y;
      this.shape = pieceToMove.shape;
    }

    getPieceShape(){
      this.shape = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
      this.color = '#114b0b';
      this.x = 0;
      this.y = 0;
    }

}

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}
