import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantThumbnailComponent } from './plant-thumbnail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PlantsListResolver } from '../resolver/plants-list-resolver.service';
import { PlantsService } from '../shared/plants.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { PlantsListComponent } from '../plants-list.component';
import { By } from '@angular/platform-browser';



describe('PlantThumbnailComponent', () => {
  let component: PlantsListComponent;
  let fixture: ComponentFixture<PlantsListComponent>;
  let componentThumbnail: PlantThumbnailComponent;
  let fixtureThumbnail: ComponentFixture<PlantThumbnailComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlantThumbnailComponent,
        PlantsListComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        AppRoutingModule,
        RouterTestingModule,

      ],
      providers:[
        PlantsListResolver,
        { provide: PlantsService, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixtureThumbnail = TestBed.createComponent(PlantThumbnailComponent);
    componentThumbnail = fixtureThumbnail.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the toggle method', () => {
    let spy = spyOn(componentThumbnail, 'toggle').and.callThrough();

    componentThumbnail.toggle();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return the state of the toggle', () => {
    spyOn(componentThumbnail, 'toggle').and.callThrough();

    componentThumbnail.toggle();
    fixture.detectChanges();

    expect(componentThumbnail.state).toEqual('expanded');

    componentThumbnail.toggle();
    fixture.detectChanges();

    expect(componentThumbnail.state).toEqual('collapsed');
  });

  xit('should open the select image dialog when when the Select Image button is clicked', inject([MatDialog], (dialog: MatDialog) => {
    componentThumbnail.plant.name = 'Carrots';
    let spy = spyOn(componentThumbnail.dialog, 'open').and.callThrough();

    componentThumbnail.addToGarden();
    expect(spy).toHaveBeenCalledTimes(1);

  }));
  fit('should call the delete method when the button is clicked', (() => {
    spyOn(componentThumbnail.plantDeleted, 'emit');
    fixture.debugElement.query(By.css('.delete')).nativeElement.click();
    expect(componentThumbnail.plantDeleted.emit).toHaveBeenCalledWith(1);
  }));

  fit('should emit when delete() is called', () => {
    spyOn(componentThumbnail.plantDeleted, 'emit');
    componentThumbnail.delete(); // call the onClick method directly
    expect(componentThumbnail.plantDeleted.emit).toHaveBeenCalledWith(1);
  });
});
