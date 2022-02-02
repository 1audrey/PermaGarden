////import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
////import { FormsModule } from '@angular/forms';
////import { MatSelect } from '@angular/material/select';
////import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
////import { By } from '@angular/platform-browser';
////import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
////import { Router } from '@angular/router';
////import { RouterTestingModule } from '@angular/router/testing';
////import { NotificationsService } from 'src/app/shared/notifications.service';
////import { PatchesService } from 'src/app/shared/patches.service';
////import { PlantsService } from 'src/app/shared/plants.service';
////import { IPatch } from '../models/ipatch-model';

////import { CreatePatchComponent } from './create-patch.component';

////describe('CreatePatchComponent', () => {
////  let component: CreatePatchComponent;
////  let fixture: ComponentFixture<CreatePatchComponent>;
////  let plantService: PlantsService;
////  let patchesService: PatchesService;
////  let routerSpy = { navigate: jasmine.createSpy('navigate') };
////  let notifications: NotificationsService;

////  let patch: IPatch =
////    {
////      name: 'test name',
////      icon: 'test url',
////      plantlist: [{
////        name: "test",
////        startingMethod: "Sowing in pots",
////        startingMonths: ["March", "April"] ,
////        sowingPeriodInDays: 21,
////        harvestingMonths: ["January"],
////        growingPeriodInDays: 120,
////        plantImagePicture: 'assets/images/spring-onions.jpg',
////      }]
////    };

////  beforeEach(async () => {


////    await TestBed.configureTestingModule({
////      declarations: [ CreatePatchComponent ],
////      imports: [
////        RouterTestingModule,
////        FormsModule,
////        MatSnackBarModule,
////        BrowserAnimationsModule,


////      ],
////      providers:[
////        MatSnackBar,
////        NotificationsService,
////        PlantsService,
////        PatchesService,
////        { provide: Router, useValue: routerSpy},
////      ]
////    })
////    .compileComponents();
////  });

////  beforeEach(() => {
////    fixture = TestBed.createComponent(CreatePatchComponent);
////    component = fixture.componentInstance;
////    fixture.detectChanges();

////    plantService = TestBed.get(PlantsService);

////    patchesService = TestBed.get(PatchesService);

////    notifications = TestBed.get(NotificationsService)

////  });

////  it('should create', () => {
////    expect(component).toBeTruthy();
////  });

////  it('should cancel the form page when the button cancel is clicked', () => {
////    fixture.detectChanges();
////    fixture.debugElement.query(By.css('#cancel-button')).nativeElement.click();
////    fixture.detectChanges();
////    expect(routerSpy.navigate).toHaveBeenCalledWith(['garden-footprint']);
////  });

////  it('should call the plant service on ngOnInit', (done: () => void) => {
////    const spy = spyOn(plantService, 'getPlants');

////    component.ngOnInit();
////    fixture.detectChanges();

////    fixture.whenStable().then(() => {
////      expect(spy).toHaveBeenCalledTimes(1);
////      done();
////    });
////  });

////  it('should change dirty value to false when savePatch is clicked', () => {
////    fixture.detectChanges();
////    let patch: IPatch =
////    {
////      name: 'test name',
////      icon: 'test url',
////      plantlist: [{
////        name: "test",
////        startingMethod: "Sowing in pots",
////        startingMonths: ["March", "April"] ,
////        sowingPeriodInDays: 21,
////        harvestingMonths: ["January"],
////        growingPeriodInDays: 120,
////        plantImagePicture: 'assets/images/spring-onions.jpg',
////      }]
////    };

////    component.savePatch(patch);
////    fixture.detectChanges();

////    expect(component.isDirty).toBeFalsy();
////  });

////  it('should call the notification success service when savePatch is clicked', () => {
////    fixture.detectChanges();

////    const spy = spyOn(notifications, 'showSuccess');

////    component.savePatch(patch);
////    fixture.detectChanges();

////    expect(spy).toHaveBeenCalledTimes(1);
////  });

////  it('should call the patch service when savePatch is clicked', () => {
////    fixture.detectChanges();

////    const spy = spyOn(patchesService, 'savePatch');

////    component.savePatch(patch);
////    fixture.detectChanges();

////    expect(spy).toHaveBeenCalledOnceWith(patch);
////  });

////  it('should call cancel when savePatch is clicked', () => {
////    fixture.detectChanges();

////    component.savePatch(patch);
////    fixture.detectChanges();
////    expect(routerSpy.navigate).toHaveBeenCalledWith(['garden-footprint']);
////  });


////});


