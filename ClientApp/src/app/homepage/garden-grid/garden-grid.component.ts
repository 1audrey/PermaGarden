import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { COLORS, IPiece, PieceComponent } from './piece/piece.component';

@Component({
  selector: 'app-garden-grid',
  templateUrl: './garden-grid.component.html',
  styleUrls: ['./garden-grid.component.css']
})
export class GardenGridComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private static readonly COLS = 10;
  private static readonly ROWS = 20;
  private static readonly BLOCK_SIZE = 30;

  ctx!: CanvasRenderingContext2D;
  garden!: number[][];
  piece!: PieceComponent;
  pieces: PieceComponent [] = [];

  moves = {
    0: (p: IPatchShape): IPatchShape => ({ ...p, x: p.x - 1 }),
    1: (p: IPatchShape): IPatchShape => ({ ...p, x: p.x + 1 }),
    2: (p: IPatchShape): IPatchShape => ({ ...p, y: p.y - 1 }),
    3: (p: IPatchShape): IPatchShape => ({ ...p, y: p.y + 1 }),
    4: (p: IPatchShape): IPatchShape => this.rotate(p)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key != null) {
      // If the keyCode exists in our moves stop the event from bubbling.
      event.preventDefault();
      // Get the next state of the piece.
      switch(event.key){
        case "ArrowLeft": {
          const movingPiece = this.moves[0](this.piece);
          if(this.isValid(movingPiece)){
            this.movePieceToNewPlace(movingPiece);
          }
          break;
        }
        case "ArrowRight": {
          const movingPiece = this.moves[1](this.piece);
          if(this.isValid(movingPiece)){
          this.movePieceToNewPlace(movingPiece);
          }
          break;
        }
        case "ArrowUp": {
          const movingPiece = this.moves[2](this.piece);
          if(this.isValid(movingPiece)){
          this.movePieceToNewPlace(movingPiece);
          }
          break;
        }
        case "ArrowDown": {
          const movingPiece = this.moves[3](this.piece);
          if(this.isValid(movingPiece)){
          this.movePieceToNewPlace(movingPiece);
          }
          break;
        }
        case " ":{
          const movingPiece = this.moves[4](this.piece);
          if(this.isValid(movingPiece)){
            this.movePieceToNewPlace(movingPiece);
            }
          break;
        }
      }
    }
  }

  ngOnInit() {
    this.initBoard();

    this.garden = this.getEmptyBoard();
    console.table(this.garden);

  }

  initBoard() {
    // Get the 2D context that we draw on.
    this.ctx = this.canvas.nativeElement.getContext("2d") as unknown as CanvasRenderingContext2D;;

    // Calculate size of canvas from constants.
    this.ctx.canvas.width = GardenGridComponent.COLS * GardenGridComponent.BLOCK_SIZE;
    this.ctx.canvas.height = GardenGridComponent.ROWS * GardenGridComponent.BLOCK_SIZE;

    this.ctx.scale(GardenGridComponent.BLOCK_SIZE, GardenGridComponent.BLOCK_SIZE);
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: GardenGridComponent.ROWS }, () => Array(GardenGridComponent.COLS).fill(0));
  }

  draw() {
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  drawBoard() {
    this.garden.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
        else if (value === 2){
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      })
      });
  }

  movePieceToNewPlace(movingPiece: IPatchShape){
          // Move the piece
          this.piece.move(movingPiece);
          // Clear the old position before drawing
          this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          // Draw the new position.
          this.draw();
  }

  rotate(piece: IPatchShape): IPatchShape {
    let clone: IPatchShape = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < clone.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [clone.shape[x][y], clone.shape[y][x]] = [clone.shape[y][x], clone.shape[x][y]];
      }
    }
    clone.shape.forEach(row => row.reverse());
    return clone;
  }

  addPatch(shape: string){
    this.piece = new PieceComponent(this.ctx);
    console.log(this.piece);

    this.piece.getPieceShape(shape);
    this.piece.draw();
  }

  freeze(piece: IPatchShape) {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.garden[y + piece.y][x + piece.x] = value;
          console.table(this.garden);
        }
      });
    });
  }

  private isValid(piece: IPiece): boolean {
    return piece.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = piece.x + dx;
        let y = piece.y + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) &&
            this.aboveFloor(y) &&
            this.notOccupied(this.garden, x, y))
        );
      });
    });
  }

  private isEmpty(value: number): boolean {
    return value === 0;
  }

  private insideWalls(x: number): boolean {
    return x >= 0 && x < GardenGridComponent.COLS;
  }

  private aboveFloor(y: number): boolean {
    return y>= 0 && y < GardenGridComponent.ROWS;
  }

  private notOccupied(board: number[][], x: number, y: number): boolean {
    return board[y] && board[y][x] === 0;
  }

}

export interface IPatchShape {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}
