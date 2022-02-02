////import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
////import { FormControl } from '@angular/forms';
////import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
////import { By } from '@angular/platform-browser';
////import { Router } from '@angular/router';
////import { IPatch } from 'src/app/garden/models/ipatch-model';
////import { PatchResolverService } from 'src/app/resolver/patch-resolver.service';
////import { PatchesService } from 'src/app/shared/patches.service';
////import { PlantsListResolver } from '../../resolver/plants-list-resolver.service';
////import { PlantsService } from '../../shared/plants.service';

////import { AddToGardenComponent } from './add-to-garden.component';

////describe('AddToGardenComponent', () => {
////  let component: AddToGardenComponent;
////  let fixture: ComponentFixture<AddToGardenComponent>;
////  const mockDialogRef = { close: jasmine.createSpy('close') };
////  let patchService = new PatchesService;
////  const routerSpy = { navigate: jasmine.createSpy('navigate') };


////  beforeEach(async () => {

////    await TestBed.configureTestingModule({
////      declarations: [AddToGardenComponent],
////      imports: [
////        MatDialogModule,


////      ],
////      providers: [
////        PlantsService,
////        PlantsListResolver,
////        PatchResolverService,
////        { provide: MatDialogRef, useValue: mockDialogRef },
////        { provide: MAT_DIALOG_DATA, useValue: {} },
////        { provide: PatchesService, useValue: patchService },
////        { provide: Router, useValue: routerSpy }

////      ]
////    })
////      .compileComponents();
////  });

////  beforeEach(() => {
////    fixture = TestBed.createComponent(AddToGardenComponent);
////    component = fixture.componentInstance;
////    fixture.detectChanges();

////  });

////  it('should create', () => {
////    expect(component).toBeTruthy();
////  });

////  it('should cancel the dialog when cancel button is clicked', async(() => {
////    component.cancel();
////    fixture.detectChanges();
////    expect(mockDialogRef.close).toHaveBeenCalled();
////  }));


////  xit('should call the createPatch method when the button is clicked', fakeAsync(() => {

////    component.patches.length === 0;
////    fixture.detectChanges();

////    const spy = spyOn(component, 'createPatch');

////    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.create-patch');
////    button.click();

////    fixture.detectChanges();

////    expect(spy).toHaveBeenCalledTimes(1);

////  }));

////  it('should call the service on ngOnInit and set property isLoading to true', (done) => {
////    const spy = spyOn(patchService, 'getPatch').and.callThrough();

////    component.ngOnInit();
////    fixture.detectChanges();

////    fixture.whenStable().then(() => {
////      expect(spy).toHaveBeenCalledTimes(1);
////      expect(component.isLoading).toBeTrue();
////      done();

////    });
////  });

////  it('should call the service when addOnGardenPage method is called ', () => {
////    var plant = {
////      name: "Spring Onions",
////      startingMonths: [
////        "September"
////      ],
////      startingMethod: "Sowing in pots",
////      sowingPeriodInDays: 21,
////      harvestingMonths: [
////        "January",
////      ],
////      harvestingPeriodInDays: 120,
////      plantImagePicture: "assets/images/spring-onions.jpg"
////    }

////    var patchName = 'Patch 1'
////    const spy = spyOn(patchService, 'savePlantInPatch').and.callThrough();

////    component.addOnGardenPage(patchName, plant);
////    fixture.detectChanges();

////    expect(spy).toHaveBeenCalledTimes(1);
////    expect(spy).toHaveBeenCalledOnceWith(patchName, plant);
////  });

////  it('should call the dialog close when addOnGardenPage method is called ', () => {
////    var plant = {
////      name: "Spring Onions",
////      startingMonths: [
////        "September"
////      ],
////      startingMethod: "Sowing in pots",
////      sowingPeriodInDays: 21,
////      harvestingMonths: [
////        "January",
////      ],
////      harvestingPeriodInDays: 120,
////      plantImagePicture: "assets/images/spring-onions.jpg"
////    }

////    var patchName = 'Patch 1'

////    component.addOnGardenPage(patchName, plant);
////    fixture.detectChanges();

////    expect(mockDialogRef.close).toHaveBeenCalled();

////  });

////  it('should call the router navigate property when addOnGardenPage method is called ', () => {
////    var plant = {
////      name: "Spring Onions",
////      startingMonths: [
////        "September"
////      ],
////      startingMethod: "Sowing in pots",
////      sowingPeriodInDays: 21,
////      harvestingMonths: [
////        "January",
////      ],
////      harvestingPeriodInDays: 120,
////      plantImagePicture: "assets/images/spring-onions.jpg"
////    }

////    var patchName = 'Patch 1'

////    component.addOnGardenPage(patchName, plant);
////    fixture.detectChanges();

////    expect(routerSpy.navigate).toHaveBeenCalled();

////  });

////  // it('should set patchName to selected option when onSelection method is called ', () => {

////  //   let expected = component.patch.name;

////  //   expect(component.patchName).toBe(expected);

////  // });

////});
