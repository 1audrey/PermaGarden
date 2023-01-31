import { Component } from '@angular/core';
import { IPiece } from '../models/IPiece';


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
    size!:string;

    constructor(private ctx: CanvasRenderingContext2D) {
     }

     move(pieceToMove: IPiece) {
      this.x = pieceToMove.x;
      this.y = pieceToMove.y;
      this.shape = pieceToMove.shape;
    }

    getPieceShape(shape: string, size: string){
      SHAPES.forEach((piece)=>{
        if(piece.name === shape){
          this.shape = piece.description.shape;
          this.image = piece.description.image;
          this.x = piece.description.x;
          this.y = piece.description.y;
          this.size = size;
          if(shape === 'rectangle'){
            this.shape = this.getsRectangleSize(piece.value, size);
          }
          else{
            this.shape = this.getsNewShapeSize(piece.value, size);
          }
        }
      });

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
            this.getShapeImage(this.image);
          }
        });
      });
    }

    getShapeImage(image: string){
      let sizeX = 1;
      let sizeY = 1;

      let img = new Image();
      if(this.size === 'medium'){
        sizeX = 2;
        sizeY = 2;
      }
      else if(this.size === 'large'){
        sizeX = 3;
        sizeY = 3;
      }
      img.src = image;
      img.onload = () => {
        this.ctx.drawImage(img, this.x, this.y , sizeX, sizeY);
      };
    }

    private getsNewShapeSize(value:number, size:string): number[][] {
      switch(size){
        case 'small': {
          return [[0, 0, 0], [0, value , 0], [0, 0, 0]];
        }
        case 'medium': {
          return [[value, value, 0], [value, value , 0], [0, 0, 0]];
        }
        case 'large': {
          return [[value, value, value], [value, value, value], [value, value, value]];
        }
        default:
          return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      }
    }

    private getsRectangleSize(value:number, size:string): number[][] {
      switch(size){
        case 'small': {
          return [[0, value, 0], [0, value , 0], [0, 0, 0]];
        }
        case 'medium': {
          return [[0, value, 0], [0, value , 0], [0, value, 0]];
        }
        case 'large': {
          return [[value, value, 0], [value, value, 0], [value, value, 0]];
        }
        default:
          return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      }
    }
}

export const SHAPES = [
  {
  name : 'rectangle',
  value: 1,
  description: {
    shape : [[0, 1, 0], [0, 1, 0], [0, 0, 0]],
    image : '#114b0b',
    x : 0,
    y : 0,
    size: 'small'
  }
},
{
  name : 'square',
  value: 2,
  description: {
    shape : [[0, 0, 0], [0, 2, 0], [0, 0, 0]],
    image : '#fecc47',
    x : 0,
    y : 0,
    size: 'small'
  }
},
{
  name : 'cercle',
  value: 3,
  description: {
    shape : [[0, 0, 0], [0, 3, 0], [0, 0, 0]],
    image :   "../../../assets/shapes/cercle-shape.png",
    x : 0,
    y : 0,
    size: 'small'
  }
},
{
  name : 'tree',
  value: 4,
  description: {
    shape : [[0, 0, 0], [0, 4, 0], [0, 0, 0]],
    image :   "../../../assets/shapes/tree-shape.png",
    x : 0,
    y : 0,
    size: 'small'
  }
}
]


