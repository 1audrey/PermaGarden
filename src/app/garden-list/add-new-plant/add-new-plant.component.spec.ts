import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from 'src/app/user/auth.service';
import { FilterPipe } from '../pipe/filter.pipe';
import { PlantImageService } from '../shared/plant-image.service';
import { PlantsService } from '../shared/plants.service';

import { AddNewPlantComponent } from './add-new-plant.component';

describe('AddNewPlantComponent', () => {
  let component: AddNewPlantComponent;
  let fixture: ComponentFixture<AddNewPlantComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPlantComponent, FilterPipe ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers:[
        {provide: Router, useValue: routerSpy},
        AuthService,
        PlantsService,
        PlantImageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the form page when the button is clicked', fakeAsync(() => {
    spyOn(component, 'cancel');
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-button');
    button.click();
    tick();
    expect(component.cancel).toHaveBeenCalledTimes(1);
  }));

  it('should navigate to the plant list page when the cancel button is clicked',inject ([Router], () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['plants-list']);
  }));

  it('save should be called when the save button is clicked', fakeAsync(() => {
    spyOn(component, 'savePlant');

    let button = fixture.debugElement.nativeElement.querySelector('#save-plant');
    button.click();
    tick();
    expect(component.savePlant).toHaveBeenCalledTimes(1);
  }));

  it('should navigate to the plant list page when the save button is clicked',inject ([Router], () => {
    const formValues = {
      name: "test",
      sowingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
      sowingPeriodInDays: 21,
      harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
      harvestingPeriodInDays: 120,
      imageURL: 'assets/images/spring-onions.jpg',
      }
    component.savePlant(formValues);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['plants-list']);
  }));

  it('should save the new plant when when the save button is clicked', inject([PlantsService], (plantService: PlantsService) => {
    let plantSpy = spyOn(plantService, 'savePlant').and.callThrough();

    component.savePlant({
      name: "test",
      sowingMonths: ["March", "April"] ,
      sowingPeriodInDays: 21,
      harvestingMonths: ["January"],
      harvestingPeriodInDays: 120,
      imageURL: 'assets/images/spring-onions.jpg',
    });

    fixture.detectChanges();

    expect(plantSpy).toHaveBeenCalledTimes(1);
    expect(plantSpy).toHaveBeenCalledOnceWith({name: 'test', sowingMonths: ["March", "April"],sowingPeriodInDays: 21, harvestingMonths: ["January"],harvestingPeriodInDays: 120, imageURL:'assets/images/spring-onions.jpg'});
  }));

  fit('should open the select image dialog when when the Select Image button is clicked', inject([MatDialog], (dialog: MatDialog) => {
    fixture.detectChanges();
    let spy = spyOn(component.dialog, 'open').and.callThrough();
    component.openSelectImageDialog();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should call the afterClosed() method when the dialog is saved', ( () => {
    let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { imageUrl : 'assets/images/carrots.jpg' };
    let dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    fixture.detectChanges();
    component.openSelectImageDialog();
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  }));



});
