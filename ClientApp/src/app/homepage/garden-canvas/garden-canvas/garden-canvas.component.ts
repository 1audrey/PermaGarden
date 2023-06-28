import { Component, HostListener, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as d3 from "d3";
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { PatchesService } from 'src/app/services/patches/patches.service';
import { IGardenArea } from '../models/garden-area-models';
import { IPatchChangesModel } from '../models/patch-changes-model';
import { CircleDialogComponent } from './circle-dialog/circle-dialog.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FoundationShapeDialogComponent } from './foundation-shape-dialog/foundation-shape-dialog.component';
import { ImageShapeDialogComponent } from './image-shape-dialog/image-shape-dialog.component';
import { RectangleDialogComponent } from './rectangle-dialog/rectangle-dialog.component';

@Component({
  selector: 'app-garden-canvas',
  templateUrl: './garden-canvas.component.html',
  styleUrls: ['./garden-canvas.component.css']
})

export class GardenCanvasComponent implements OnInit, AfterViewInit {
  length: number;
  width: number;
  x: number;
  y: number;
  patchId: number;
  menuDisplayed = false;
  gardenDimensions: boolean = false;
  gardenBorder = false;
  gardenBorderExists = false;
  patchesToSave: IPatchChangesModel[] = [];
  rotationAngleToSave: number = 0;
  patchName: string
  lineX = 0;
  lineY = 0;

  private static readonly EXTRA_CANVA_DIMENSION = 0.3;

  points: Array<[number, number]> = [];
  private currentLine?: any;
  private draggingPoints: number[] = [];
  private draggingElement?: d3.Selection<SVGGElement, unknown, null, any>;
  private currentPoint: { x: number, y: number } = { x: 0, y: 0 };
  private mousedown = false;
  private rotatePatch = false;

  constructor(
    private renderer: Renderer2,
    public dialog: MatDialog,
    private patchService: PatchesService,
    private notifications: NotificationsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patchService.getSvgDimensions().subscribe((result)=>{
      this.length = result[0].length;
      this.width = result[0].width;
      this.gardenDimensions = true;
    });
    this.patchService.getGardenBorder().subscribe((result) => {
      this.points = result;
      this.createPolygon();
      this.gardenBorder = true;
      this.gardenBorderExists = true;
    });
  }

  ngAfterViewInit() {
    this.patchService.getPatchesShape().subscribe((result) => {
      result.forEach((patch) => {
        switch(patch.patchImagePicture){
          case 'assets/shapes/foundation-shape.png':
            this.createRectangleFoundation(patch.length, patch.width, patch.patchName, patch.xPosition, patch.yPosition, patch.rotationAngle)
            break;

          case 'assets/shapes/rectangle-shape.png':
            this.createRectangleBed(patch.length, patch.width, patch.patchName, patch.xPosition, patch.yPosition, patch.rotationAngle)
            break;

          case 'assets/shapes/square-shape.png':
            this.createSquareBed(patch.length, patch.width, patch.patchName, patch.xPosition, patch.yPosition, patch.rotationAngle)
            break;

          case 'assets/shapes/cercle-shape.png':
            this.createCircleBed(patch.diameter, patch.patchName, patch.xPosition, patch.yPosition, patch.rotationAngle)
            break;

          default:
            this.createImageBed(patch.shape, patch.diameter, patch.patchName, patch.xPosition, patch.yPosition, patch.rotationAngle);
            break;
        }
      });
    });
  }

  saveChanges(){
    this.patchService.saveUpdatedPatches(this.patchesToSave).subscribe();
    this.notifications.showSuccess('Changes saved')
    this.patchesToSave = [];
  }

  saveGardenSize(formValues: IGardenArea) {
    this.length = formValues.length + (formValues.length * GardenCanvasComponent.EXTRA_CANVA_DIMENSION);
    this.width = formValues.width + (formValues.width * GardenCanvasComponent.EXTRA_CANVA_DIMENSION);
    this.gardenDimensions = true;

    let area: IGardenArea =
    {length: null,
    width: null}

    area.length = Math.ceil(this.length);
    area.width = Math.ceil(this.width);

    this.patchService.saveSvgDimensions(area).subscribe();
  }

  addRectangularShape() {
    let patches = this.route.snapshot.data['patches'];

    let dialogRef = this.dialog.open((RectangleDialogComponent), {
      width: '500px',
      data: { patches: patches },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notifications.showSuccess(`${result.patchName} has been added to your garden`);
      this.saveRectanglePatch(result.length, result.width, result.patchName);
    })
  }

  addFoundationArea(){
    let patches = this.route.snapshot.data['patches'];

    let dialogRef = this.dialog.open((FoundationShapeDialogComponent), {
      width: '500px',
      data: { patches: patches },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notifications.showSuccess(`${result.patchName} has been added to your garden`);
      this.saveFoundationPatch(result.length, result.width, result.patchName);
    })
  }

  addCircularShape() {
    let patches = this.route.snapshot.data['patches'];

    let dialogRef = this.dialog.open((CircleDialogComponent), {
      width: '500px',
      data: { patches: patches },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notifications.showSuccess(`${result.patchName} has been added to your garden`);
      this.saveCirclePatch(result.diameter, result.patchName);
    });
  }

  addImageShape(shape: string) {
    let patches = this.route.snapshot.data['patches'];

    let dialogRef = this.dialog.open((ImageShapeDialogComponent), {
      width: '500px',
      data: { image: shape, patches: patches },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notifications.showSuccess(`${result.patchName} has been added to your garden`);
      this.saveImagePatch(shape, result.diameter, result.patchName);
    })
  }

  saveRectanglePatch(length: number, width: number, patchName: string) {
    if (length !== width) {
      let shape = 'rectangle';
      let imagePicture = 'assets/shapes/rectangle-shape.png'
      let xPosition = 10;
      let yPosition = 10;
      let rotationAngle = 0;
      this.createRectangleBed(length, width, patchName, xPosition, yPosition, rotationAngle)
      this.patchService.saveRectanglePatch(patchName, width, length, xPosition, yPosition, shape, imagePicture, rotationAngle);
    }
    else {
      let shape = 'square';
      let imagePicture = 'assets/shapes/square-shape.png'
      let xPosition = 10;
      let yPosition = 10;
      let rotationAngle = 0;
      this.createSquareBed(length, width, patchName, xPosition, yPosition, rotationAngle);
      this.patchService.saveRectanglePatch(patchName, width, length, xPosition, yPosition, shape, imagePicture, rotationAngle);
    }
  }

  saveFoundationPatch(length: number, width: number, patchName: string) {
      let shape = 'rectangle';
      let imagePicture = 'assets/shapes/foundation-shape.png'
      let xPosition = 10;
      let yPosition = 10;
      let rotationAngle = 0;
      this.createRectangleFoundation(length, width, patchName, xPosition, yPosition, rotationAngle)
      this.patchService.saveRectanglePatch(patchName, width, length, xPosition, yPosition, shape, imagePicture, rotationAngle);
    }

  saveCirclePatch(diameter: number, patchName: string) {
    let shape = 'circle';
    let imagePicture = 'assets/shapes/cercle-shape.png'
    let xPosition = diameter;
    let yPosition = diameter;
    let rotationAngle = 0;

    this.createCircleBed(diameter, patchName, xPosition, yPosition, rotationAngle);
    this.patchService.saveCircleAndImagePatch(patchName, diameter, xPosition, yPosition, shape, imagePicture, rotationAngle);
  }

  saveImagePatch(shape: string, diameter: number, patchName: string) {
    let imagePicture = `assets/shapes/${shape}-shape.png`
    let xPosition = diameter;
    let yPosition = diameter;
    let rotationAngle = 0;

    this.createImageBed(shape, diameter, patchName, xPosition, yPosition, rotationAngle);
    this.patchService.saveCircleAndImagePatch(patchName, diameter, xPosition, yPosition, shape, imagePicture, rotationAngle);
  }

  rotatingPatch() {
    this.rotatePatch = true;
    document.body.style.cursor = 'grab';
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.mousedown = true;
    this.currentPoint = this.getMousePosition(event);

    let target = (event.target as SVGGElement);
    this.draggingElement = d3.select(target);

    if (!this.gardenBorderExists && target.id === 'garden-grid' || target.tagName === 'line') {
      this.addHelperShapes(event);
    }

    if (!this.gardenBorderExists && target.id !== 'garden-grid' && this.points.length >= 3) {
      this.createPolygon();
      this.gardenBorder = true;
      this.gardenBorderExists = true;
      this.patchService.saveGardenBorder(this.points).subscribe();
      this.clearHelperShapes();
    }

    if (target.tagName === 'rect' || target.tagName === 'image') {
      this.draggingPoints = this.getPointsFromShape();
    }

    if (target.tagName === 'circle') {
      this.draggingPoints = this.getPointsFromCircle();
    }

    if (target.tagName === 'svg') {
      this.lineX = 0;
      this.lineY = 0;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    let coordinates = this.getMousePosition(event);
    let x = coordinates.x - this.currentPoint.x;
    let y = coordinates.y - this.currentPoint.y;
    let target = (event.target as SVGGElement);

    this.lineX = coordinates.x - this.currentPoint.x;
    this.lineY = coordinates.y - this.currentPoint.y;

    if(target.id === 'garden-grid'){
      return;
    }

    if (target.tagName === 'rect' || target.tagName === 'image') {
      this.moveShape(x, y, coordinates);
    }

    if (target.tagName === 'circle') {
      this.moveCircle(x, y);
    }

    if (this.draggingElement && this.mousedown && this.rotatePatch) {
      this.patchRotation(coordinates);
    }

    if (target.tagName === 'svg' && this.points.length >= 1) {
      let rect: SVGRectElement | null = document.querySelector('rect');
      if (rect) {
        this.renderer.setAttribute(rect, 'stroke', 'transparent');
      }
    }
    // Move line by changing the coordinates
    if (this.currentLine) {
      this.currentLine.attr('x2', coordinates.x).attr('y2', coordinates.y)
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.mousedown = false;
    this.rotatePatch = false;
    this.addPatchesToSave(event);
    this.draggingElement = undefined;
    this.renderer.setStyle(document.body, 'cursor', 'initial');
  }

  private addPatchesToSave(event: MouseEvent) {
    let coordinates = this.getMousePosition(event);
    let x = coordinates.x - this.currentPoint.x;
    let y = coordinates.y - this.currentPoint.y;
    let target = (event.target as SVGGElement);

    if(target.id === 'garden-grid'){
      return;
    }

    if (target.tagName === 'rect' || target.tagName === 'image' || target.tagName === 'circle') {
      let transformAttribute = this.draggingElement.attr('transform').split(' ');
      let angle = transformAttribute[0].split('rotate(');

      let patchToSave = this.setUpPatchToSave(x, y, angle[1])

      const patchIndex = this.patchesToSave.findIndex((patch) => patch.patchName === patchToSave.patchName);

      if (patchIndex === -1) {
        this.patchesToSave.push(patchToSave);
      }
      this.patchesToSave.splice(patchIndex, 1, patchToSave);
      console.log('patchesToSave', this.patchesToSave);
    }
  }

  private setUpPatchToSave(x: number, y: number, angle: string): IPatchChangesModel{
    let patchToSave: IPatchChangesModel = {
      patchName: this.draggingElement.text(),
      xPosition: x + this.draggingPoints[0],
      yPosition: y + this.draggingPoints[1],
      rotationAngle: Number(angle)
    };

    if (this.rotationAngleToSave != 0){
      patchToSave.rotationAngle = this.rotationAngleToSave
    }

    return patchToSave;
  }

  private addHelperShapes(event: MouseEvent) {
    let coordinates = this.getMousePosition(event);
    this.points.push([coordinates.x, coordinates.y]);
    if (this.points.length == 1) {
      d3.select('.svg').append('rect')
        .attr('x', coordinates.x)
        .attr('y', coordinates.y)
        .attr('width', '10')
        .attr('height', '10')
        .attr('fill', 'black')
        .attr('class', 'help')
    }

    this.currentLine = d3.select('.svg')
      .insert('line', ':nth-child(1)')
      .attr('x1', coordinates.x)
      .attr('x2', coordinates.x)
      .attr('y1', coordinates.y)
      .attr('y2', coordinates.y)
      .attr('stroke', 'grey')
      .attr('class', 'help')
  }

  private createPolygon() {
    d3.select('.svg')
      .append("polygon")
      .attr("points", this.points.join(' '))
      .attr("fill", "lightgrey")
      .attr("opacity", "40%")
      .attr("stroke", "black")
  }

  private moveShape(x: number, y: number, coordinates: any) {
    if (this.draggingElement && this.mousedown && !this.rotatePatch) {
      document.body.style.cursor = 'move';

      if(this.isElementRotated()){
        //TODO x and y doivent etre la vraie donnee avec l'angle
        this.draggingElement?.attr('x', x + this.draggingPoints[0]);
        this.draggingElement?.attr('y', y + this.draggingPoints[1]);

      }
      else{
        this.draggingElement?.attr('x', x + this.draggingPoints[0]);
        this.draggingElement?.attr('y', y + this.draggingPoints[1]);
      }
    }
  }

  private isElementRotated(): boolean{
    let x = Number(this.draggingElement.attr('x'));
    let y = Number(this.draggingElement.attr('y'));

    return this.draggingElement.attr('transform') !== `rotate(0 ${x} ${y})`;
  }

  private moveCircle(x: number, y: number) {
    if (this.draggingElement && this.mousedown && !this.rotatePatch) {
      document.body.style.cursor = 'move';

      this.draggingElement?.attr('cx', x + this.draggingPoints[0]);
      this.draggingElement?.attr('cy', y + this.draggingPoints[1]);
    }
  }

  patchRotation(coordinates: any) {
    let centerOfPatch = this.getCenterOfPatch();
    let centerOfPatchX = centerOfPatch[0] + this.draggingPoints[0];
    let centerOfPatchY = centerOfPatch[1] + this.draggingPoints[1];

    var dY = coordinates.y - centerOfPatchY;
    var dX = coordinates.x - centerOfPatchX;

    let angle = Math.atan2(dY, dX) / Math.PI * 180.0;

    this.rotationAngleToSave = angle;

    this.draggingElement?.attr('transform', `rotate(${angle} ${centerOfPatchX} ${centerOfPatchY})`);
  }

  private createRectangleBed(length: number, width: number, patchName: string, xPosition: number, yPosition: number, rotationAngle: number) {
    d3.select('.svg').append('rect')
      .attr('x', xPosition)
      .attr('y', yPosition)
      .attr('width', `${width}`)
      .attr('height', `${length}`)
      .attr('fill', '#114b0b')
      .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
      .on("contextmenu", (event: MouseEvent) => { this.openContextMenu(event) })
      .append('title')
      .text(`${patchName}`)
  }

  private createRectangleFoundation(length: number, width: number, patchName: string, xPosition: number, yPosition: number, rotationAngle: number) {
    d3.select('.svg').append('rect')
      .attr('x', xPosition)
      .attr('y', yPosition)
      .attr('width', `${width}`)
      .attr('height', `${length}`)
      .attr('fill', '#C2AD9A')
      .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
      .append('title')
      .text(`${patchName}`)
  }

  private createSquareBed(length: number, width: number, patchName: string, xPosition: number, yPosition: number, rotationAngle) {
    d3.select('.svg').append('rect')
      .attr('x', xPosition)
      .attr('y', yPosition)
      .attr('width', `${width}`)
      .attr('height', `${length}`)
      .attr('fill', '#fecc47')
      .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
      .on("contextmenu", (event: MouseEvent) => { this.openContextMenu(event) })
      .append('title')
      .text(`${patchName}`)
  }

  private createCircleBed(diameter: number, patchName: string, xPosition: number, yPosition: number, rotationAngle: number) {
    d3.select('.svg').append('circle')
      .attr('cx', `${xPosition}`)
      .attr('cy', `${yPosition}`)
      .attr('r', `${diameter}`)
      .attr('fill', '#fa990e')
      .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
      .on("contextmenu", (event: MouseEvent) => { this.openContextMenu(event) })
      .append('title')
      .text(`${patchName}`)
  }

  private createImageBed(shape: string, diameter: number, patchName: string, xPosition: number, yPosition: number, rotationAngle: number) {
    switch (shape) {
      case 'hexagone':
        d3.select('.svg').append('image')
          .attr('href', '../../assets/shapes/hexagone-shape.png')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('width', `${diameter}`)
          .attr('height', `${diameter}`)
          .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
          .on("contextmenu", (event: MouseEvent) => { this.openContextMenu(event) })
          .append('title')
          .text(`${patchName}`)
        break;

      case 'bush':
        d3.select('.svg').append('image')
          .attr('href', '../../assets/shapes/bush-shape.png')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('width', `${diameter}`)
          .attr('height', `${diameter}`)
          .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
          .on("contextmenu", (event: MouseEvent) => { this.openContextMenu(event) })
          .append('title')
          .text(`${patchName}`)
        break;

      case 'tree':
        d3.select('.svg').append('image')
          .attr('href', '../../assets/shapes/tree-shape.png')
          .attr('x', xPosition)
          .attr('y', yPosition)
          .attr('width', `${diameter}`)
          .attr('height', `${diameter}`)
          .attr('class', `${shape}`)
          .attr('transform', `rotate(${rotationAngle} ${xPosition} ${yPosition})`)
          .on("contextmenu", (event: MouseEvent) => { this.openContextMenu(event) })
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

  private clearHelperShapes() {
    document.querySelectorAll('.help')
      .forEach(element => {
        element.remove();
      });
    this.points = [];
  }

  private openContextMenu(event: MouseEvent) {
    event.preventDefault();

    this.menuDisplayed = true;
    let target = (event.target as SVGGElement);
    this.draggingElement = d3.select(target);
    let patchName = `${this.draggingElement.text()}`

      let dialogRef = this.dialog.open((ContextMenuComponent), {
        width: '500px',
        data: { patchName: patchName},
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.removePatch();
        }
      })
  }

  removePatch(){
    this.draggingElement.remove()
  }

}
