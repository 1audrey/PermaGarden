import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as d3 from "d3";
import { IGardenArea } from '../../models/garden-area-models';
import { CircleDialogComponent } from './circle-dialog/circle-dialog.component';
import { ImageShapeDialogComponent } from './image-shape-dialog/image-shape-dialog.component';
import { RectangleDialogComponent } from './rectangle-dialog/rectangle-dialog.component';

@Component({
  selector: 'app-garden-canvas',
  templateUrl: './garden-canvas.component.html',
  styleUrls: ['./garden-canvas.component.css']
})

export class GardenCanvasComponent implements OnInit {
  length: number;
  width: number;
  x: number;
  y: number;
  patchId: number;
  menuDisplayed = false;
  gardenDimensions: boolean = false;
  rightClickMenuItems: Array<ContextMenuModel> = [];

  private static readonly EXTRA_CANVA_DIMENSION = 20;

  points: Array<[number, number]> = [];
  private currentLine?: d3.Selection<SVGLineElement, unknown, null, any>;
  private draggingPoints: number[] = [];
  private draggingElement?: d3.Selection<SVGGElement, unknown, null, any>;
  private currentPoint: { x: number, y: number } = { x: 0, y: 0 };
  private mousedown = false;
  private rotatePatch = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  saveGardenSize(formValues: IGardenArea) {
    this.length = formValues.length + GardenCanvasComponent.EXTRA_CANVA_DIMENSION;
    this.width = formValues.width + GardenCanvasComponent.EXTRA_CANVA_DIMENSION;
    this.gardenDimensions = true;
  }

  addRectangularShape() {
    let dialogRef = this.dialog.open((RectangleDialogComponent), {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveRectanglePatch(result.length, result.width, result.patchName);
    })
  }

  addCircularShape() {
    let dialogRef = this.dialog.open((CircleDialogComponent), {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.patchId = 123456;
      this.saveCirclePatch(result.diameter, result.patchName);
    });
  }

  addImageShape(shape: string) {
    let dialogRef = this.dialog.open((ImageShapeDialogComponent), {
      width: '500px',
      data: { image: shape },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveImagePatch(shape, result.diameter, result.patchName);
    })
  }

  saveRectanglePatch(length: number, width: number, patchName: string) {
    length !== width ? this.createRectangleBed(length, width, patchName): this.createSquareBed(length, width, patchName);
  }

  saveCirclePatch(diameter: number, patchName: string) {
    this.createCircleBed(diameter, patchName);
  }

  saveImagePatch(shape: string, diameter: number, patchName: string) {
    this.createImageBed(shape, diameter, patchName);
  }

  rotatingPatch() {
    this.rotatePatch = true;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.mousedown = true;
    this.currentPoint = this.getMousePosition(event);

    let target = (event.target as SVGGElement);
    this.draggingElement = d3.select(target);

    if (target.tagName === 'rect' || target.tagName === 'image') {
      this.draggingPoints = this.getPointsFromShape();
    }

    if (target.tagName === 'circle') {
      this.draggingPoints = this.getPointsFromCircle();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    let coordinates = this.getMousePosition(event);
    let x = coordinates.x - this.currentPoint.x;
    let y = coordinates.y - this.currentPoint.y;
    let target = (event.target as SVGGElement);

    if (target.tagName === 'rect' || target.tagName === 'image') {
      this.moveShape(x, y);
    }

    if (target.tagName === 'circle') {
      this.moveCircle(x, y);
    }

    if (this.draggingElement && this.mousedown && this.rotatePatch) {
      this.patchRotation(coordinates);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(): void {
    this.mousedown = false;
    this.rotatePatch = false;
    this.draggingElement = undefined;
    this.renderer.setStyle(document.body, 'cursor', 'initial');
  }

  private moveShape(x: number, y: number){
    if (this.draggingElement && this.mousedown && !this.rotatePatch) {
      document.body.style.cursor = 'move';

      this.draggingElement?.attr('x', x + this.draggingPoints[0]);
      this.draggingElement?.attr('y', y + this.draggingPoints[1]);
    }
  }

  private moveCircle(x: number, y: number){
    if (this.draggingElement && this.mousedown && !this.rotatePatch) {
      document.body.style.cursor = 'move';

      this.draggingElement?.attr('cx', x + this.draggingPoints[0]);
      this.draggingElement?.attr('cy', y + this.draggingPoints[1]);
    }
  }

  patchRotation(coordinates: any){
    document.body.style.cursor = 'grab';

    let centerOfPatch = this.getCenterOfPatch();
    let centerOfPatchX = centerOfPatch[0] + this.draggingPoints[0];
    let centerOfPatchY = centerOfPatch[1] + this.draggingPoints[1];

    var dY = coordinates.y - centerOfPatchY;
    var dX = coordinates.x - centerOfPatchX;

    var angle = Math.atan2(dY, dX) / Math.PI * 180.0;

    this.draggingElement?.attr('transform', `rotate(${angle} ${centerOfPatchX} ${centerOfPatchY})`);
  }

  private createRectangleBed(length: number, width: number, patchName: string) {
    d3.select('.svg').append('rect')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', `${width}`)
      .attr('height', `${length}`)
      .attr('fill', '#114b0b')
      .on("contextmenu", (event: MouseEvent)=>{this.openContextMenu(event)})
      .append('title')
      .text(`${patchName}`)
  }

  private createSquareBed(length: number, width: number, patchName: string) {
    d3.select('.svg').append('rect')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', `${width}`)
      .attr('height', `${length}`)
      .attr('fill', '#fecc47')
      .on("contextmenu", (event: MouseEvent)=>{this.openContextMenu(event)})
      .append('title')
      .text(`${patchName}`)
  }

  private createCircleBed(diameter: number, patchName: string) {
    d3.select('.svg').append('circle')
      .attr('cx', `${diameter}`)
      .attr('cy', `${diameter}`)
      .attr('r', `${diameter}`)
      .attr('fill', '#fa990e')
      .on("contextmenu", (event: MouseEvent)=>{this.openContextMenu(event)})
      .append('title')
      .text(`${patchName}`)
  }

  private createImageBed(shape: string, diameter: number, patchName: string) {
    switch (shape) {
      case 'hexagone':
        d3.select('.svg').append('image')
          .attr('href', '../../assets/shapes/hexagone-shape.png')
          .attr('x', diameter)
          .attr('y', diameter)
          .attr('width', `${diameter}`)
          .attr('height', `${diameter}`)
          .on("contextmenu", (event: MouseEvent)=>{this.openContextMenu(event)})
          .append('title')
          .text(`${patchName}`)
        break;

      case 'bush':
        d3.select('.svg').append('image')
          .attr('href', '../../assets/shapes/bush-shape.png')
          .attr('x', diameter)
          .attr('y', diameter)
          .attr('width', `${diameter}`)
          .attr('height', `${diameter}`)
          .on("contextmenu", (event: MouseEvent)=>{this.openContextMenu(event)})
          .append('title')
          .text(`${patchName}`)
        break;

      case 'tree':
        d3.select('.svg').append('image')
          .attr('href', '../../assets/shapes/tree-shape.png')
          .attr('x', diameter)
          .attr('y', diameter)
          .attr('width', `${diameter}`)
          .attr('height', `${diameter}`)
          .attr('class', `${shape}`)
          .on("contextmenu", (event: MouseEvent)=>{this.openContextMenu(event)})
          .append('title')
          .text(`${patchName}`)
        break;
    }
  }

  private getPointsFromShape(): number[] {
    let pointsArray = [];
    let x = this.draggingElement?.property('x');
    x = x.animVal.value;

    let y = this.draggingElement?.property('y');
    y = y.animVal.value;

    pointsArray.push(x, y)

    return pointsArray;
  }

  private getPointsFromCircle(): number[] {
    let pointsArray = [];
    let x = this.draggingElement?.property('cx');
    x = x.animVal.value;

    let y = this.draggingElement?.property('cy');
    y = y.animVal.value;

    pointsArray.push(x, y)

    return pointsArray;
  }

  private getCenterOfPatch(): number[] {
    let pointsArray = [];
    let x = this.draggingElement?.property('width');
    x = x.animVal.value / 2;

    let y = this.draggingElement?.property('height');
    y = y.animVal.value / 2;

    pointsArray.push(x, y)

    return pointsArray;
  }

  private getMousePosition(event: MouseEvent) {
    return {
      x: event.offsetX,
      y: event.offsetY
    }
  }

  private openContextMenu(event: MouseEvent){
    console.log('context menu working')
    event.preventDefault();

    this.menuDisplayed = true;

    //TODO: change the context menu
    this.rightClickMenuItems = [
      {
        menuText: 'Refactor',
        menuEvent: 'Handle refactor',
      },
      {
        menuText: 'Format',
        menuEvent: 'Handle format',
      },
    ];
  }

  handleMenuItemClick(event) {
    //TODO: update
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
           console.log('To handle refactor');
           break;
      case this.rightClickMenuItems[1].menuEvent:
          console.log('To handle formatting');
          break;
    }
  }

  @HostListener('document:click')
  documentClick(): void {
    this.menuDisplayed = false;
  }
}

//TODO: update
export interface ContextMenuModel{
  menuText: string,
  menuEvent: string
}
