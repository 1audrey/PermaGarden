import { Component } from '@angular/core';


@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements IPiece {

    x!: number;
    y!: number;
    image!: string;
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
        this.image = IMAGE[1];
        this.x = 0;
        this.y = 0;
      }
      else if(shape ==='square'){
        this.shape = [[2, 2, 2], [2, 2, 2], [2, 2, 2]];
        this.image = IMAGE[2];
        this.x = 0;
        this.y = 0;
      }
      else if(shape ==='cercle'){
        this.shape = [[0, 0, 0], [0, 3, 0], [0, 0, 0]];
        this.image = IMAGE[3];
        this.x = 0;
        this.y = 0;
      }
      else if(shape ==='tree'){
        this.shape = [[0, 0, 0], [0, 4, 0], [0, 0, 0]];
        this.image = IMAGE[4];
        this.x = 0;
        this.y = 0;
      }
    }

    draw() {
      this.ctx.fillStyle = this.image;
      this.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value > 0 && value !== 3 && value !== 4) {
            // this.x & this.y = position on the board
            // x & y position are the positions of the shape
            this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          }
          else if(value > 0 && value === 3 || value === 4){
            this.getShapeImage(x, y, this.image);
          }
        });
      });
    }

    getShapeImage(x: number, y: number, image: string){
      let img = new Image();
      img.src = image;
      img.onload = () => {
        this.ctx.drawImage(img, this.x + x, this.y + y, 1, 1);
      };
    }
}

export interface IPiece {
  x: number;
  y: number;
  image: string;
  shape: number[][];
}

export const IMAGE = [
  'none',
  '#114b0b',
  '#fecc47',
  "../../../assets/shapes/cercle-shape.png",
  "../../../assets/shapes/tree-shape.png",
  'green',
  'purple',
  'red'
];
