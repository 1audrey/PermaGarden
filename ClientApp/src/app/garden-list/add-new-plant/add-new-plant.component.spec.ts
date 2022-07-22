import { ComponentFixture, inject, TestBed, } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/user/auth.service';
import { AddNewPlantComponent } from './add-new-plant.component';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlantsListResolver } from 'src/app/resolver/plants-list-resolver.service';

fdescribe('AddNewPlantComponent', () => {
 let component: AddNewPlantComponent;
 let fixture: ComponentFixture<AddNewPlantComponent>;
//  let routerSpy = {navigate: jasmine.createSpy('navigate')};
 let router: Router;

 beforeEach(async () => {
  const fakeRoute = {
    snapshot: {
      data: {
        plants: [
          {
            plantId: 1,
            plantName: 'Name test',
            plantStartingMonths: 'July',
            plantStartingMethod: 'Starting Method Test',
            plantSowingPeriod: 1,
            plantHarvestingMonths: 'Harvesting Month Test',
            plantGrowingPeriod: 1,
            plantImagePicture: 'Plant Image Test',
          }]
      },
    } as Partial<ActivatedRouteSnapshot>,
  } as ActivatedRoute;

   await TestBed.configureTestingModule({
     declarations: [ AddNewPlantComponent],
     imports: [
       RouterTestingModule,
       FormsModule,
       MatDialogModule,
       NoopAnimationsModule,
       MatSnackBarModule,
       HttpClientTestingModule,RouterTestingModule.withRoutes([
        { path: 'add-new-plant', component: AddNewPlantComponent }
      ]),


     ],
     providers:[
       AuthService,
       PlantsService,
       PlantsListResolver,
      { provide: ActivatedRoute, useValue: fakeRoute },
     ]
   })
   .compileComponents();
 });

 beforeEach(() => {
   router = TestBed.inject(Router);
   fixture = TestBed.createComponent(AddNewPlantComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();

 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });

 it('should cancel the form page when the cancel button is clicked', () => {
   const spy= spyOn(component, 'cancel');

   let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-button');
   button.click();

   expect(spy).toHaveBeenCalledTimes(1);
 });

 it('should navigate to the plant list page when the cancel button is clicked',inject ([Router], () => {
  const spy = spyOn(router, 'navigate')

  component.cancel();

   expect(spy).toHaveBeenCalledWith(['plants-list']);
 }));

 it('should call the new plant method when the save button is clicked', () => {
   const spy = spyOn(component, 'saveNewPlant');

   let button = fixture.debugElement.nativeElement.querySelector('#save-plant');
   button.click();

   expect(spy).toHaveBeenCalledTimes(1);
 });

//  it('should navigate to the plant list page when the save button is clicked', () => {
//    const formValues = {
//      name: "test",
//      startingMethod: "Sowing in pots",
//      startingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
//      sowingPeriodInDays: 21,
//      harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
//      harvestingPeriodInDays: 120,
//      plantImagePicture: 'assets/images/spring-onions.jpg',
//      }
//    component.saveNewPlant(formValues);

//  });

//  it('should save the new plant when the save button is clicked', inject([PlantsService], (plantService: PlantsService) => {
//    let plantSpy = spyOn(plantService, 'savePlant').and.callThrough();

//    component.savePlant({
//      name: "test",
//      startingMethod: "Sowing in pots",
//      startingMonths: ["March", "April"] ,
//      sowingPeriodInDays: 21,
//      harvestingMonths: ["January"],
//      growingPeriodInDays: 120,
//      plantImagePicture: 'assets/images/spring-onions.jpg',
//    });

//    fixture.detectChanges();

//    expect(plantSpy).toHaveBeenCalledTimes(1);
//    expect(plantSpy).toHaveBeenCalledOnceWith({name: 'test', startingMethod: "Sowing in pots", startingMonths: ["March", "April"],sowingPeriodInDays: 21, harvestingMonths: ["January"],growingPeriodInDays: 120, plantImagePicture:'assets/images/spring-onions.jpg'});
//  }));

//  xit('should open the select image dialog when when the Select Image button is clicked', inject([MatDialog], (dialog: MatDialog) => {
//    fixture.detectChanges();
//    let spy = spyOn(component.dialog, 'open').and.callThrough();
//    component.openSelectImageDialog();
//    expect(spy).toHaveBeenCalledTimes(1);
//  }));

//  it('should call the afterClosed() method when the dialog is saved', ( () => {
//    let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
//    dialogRefSpyObj.componentInstance = { imageUrl : 'assets/images/carrots.jpg' };
//    let dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

//    fixture.detectChanges();
//    component.openSelectImageDialog();
//    expect(dialogSpy).toHaveBeenCalledTimes(1);
//  }));

//  it('should call the snackbar showSuccess method when the save button is clicked with formValues', inject([NotificationsService], (notifications: NotificationsService) => {
//    let spy = spyOn(notifications, 'showSuccess');

//    component.savePlant({
//      name: "test",
//      startingMethod: "Sowing in pots",
//      startingMonths: ["March", "April"] ,
//      sowingPeriodInDays: 21,
//      harvestingMonths: ["January"],
//      growingPeriodInDays: 120,
//      plantImagePicture: 'assets/images/spring-onions.jpg',
//    });

//    expect(spy).toHaveBeenCalledTimes(1);

//  }));

});
