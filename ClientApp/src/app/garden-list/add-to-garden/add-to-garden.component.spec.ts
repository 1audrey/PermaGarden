import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PatchesService } from 'src/app/services/patches/patches.service';
import { PlantsService } from 'src/app/services/plants/plants.service';
import { PlantsListResolver } from '../../resolver/plants-list-resolver.service';
import { AddToGardenComponent } from './add-to-garden.component';
import { IPatch } from 'src/app/garden/models/ipatch-model';
import { Subject } from 'rxjs';
import { IPlantsList } from '../models/iplants-model';
import { GardenFootprintComponent } from 'src/app/garden/garden-footprint/garden-footprint.component';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('AddToGardenComponent', () => {
  let component: AddToGardenComponent;
  let fixture: ComponentFixture<AddToGardenComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };
  let router : Router;
  let routes: Routes = [{ path: 'garden', component: GardenFootprintComponent }]
  let service: PatchesService;
  let plant: IPlantsList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToGardenComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(routes),

      ],
      providers: [
        PlantsService,
        PlantsListResolver,
        PatchesService,
        NotificationsService,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    service = TestBed.inject(PatchesService);

    fixture = TestBed.createComponent(AddToGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    plant = {
      plantId: 1,
      plantName: 'Name test',
      plantStartingMonths: 'January, February',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'January, February',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the patchservice on ngOnInit ', () => {
    const spy = spyOn(service, 'getAllPatches').and.callThrough();
    setUpTestForPatchListWithPatch();

    expect(spy).toHaveBeenCalled();
  });

  xit('should return isLoaded as true when the patchservice is subscribed to ', () => {
    let getPatchesSubject = new Subject<IPatch[]>();
    spyOn(service, 'getAllPatches').and.returnValue(getPatchesSubject);
    getPatchesSubject.next(
      [{
        patchId: 1,
        patchName: 'Test Patch Name',
        patchImagePicture: 'Test patch Picture',
      }]
    );

    expect(component.isLoaded).toBeTrue();
  });

  it('should return an array of patches when the patchservice is called', () => {
    let expectedPatches = numberOfPatch(1);
    let getPatchesSubject = new Subject<IPatch[]>();
    spyOn(service, 'getAllPatches').and.returnValue(getPatchesSubject);

    getPatchesSubject.next(
      [{
        patchId: 1,
        patchName: 'Test Patch Name',
        patchImagePicture: 'Test patch Picture',
      }]
    );

    expect(component.patches).toEqual(expectedPatches);
  });

  it('should cancel the dialog when cancel button method is called', () => {
    setUpTestForPatchListWithPatch();

    component.cancel();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call the cancel method when the no-thanks button is clicked', () => {
    setUpTestForPatchListWithPatch();

    const spy = spyOn(component, 'cancel');

    const filterButton = fixture.debugElement.query(By.css('#no-thanks'));
    filterButton.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call the create-patch method when the create patch button is clicked', () => {
    const spy = spyOn(component, 'createPatch');

    setUpTestForEmptyPatchList();

    let button = fixture.debugElement.query(By.css('#create-patch')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(button.innerText).toBe('Create a patch');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call the router navigate method when the create patch mehotd is called', () => {
    const spy = spyOn(router, 'navigate');
    setUpTestForEmptyPatchList();

    component.createPatch();

    expect(spy).toHaveBeenCalledOnceWith(['create-patch']);
  });

  it('should call the dialog close method when the create patch method is called', () => {
    setUpTestForEmptyPatchList();

    component.createPatch();
    fixture.detectChanges();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should return the patch name when the patchName is selected in the drop down', () => {
    const patchName = numberOfPatch(1)[0].patchName;
    setUpTestForPatchListWithPatch();

    const compiledDom = fixture.debugElement.nativeElement;
    const select = compiledDom.querySelector('mat-select');
    select.click();
    fixture.detectChanges();
    const optionSelectList: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('mat-option');
    expect(optionSelectList.length).toBe(1);
    optionSelectList[0].dispatchEvent(new Event('valueChange'));
    fixture.detectChanges();

    expect(select.textContent).toEqual(` ${patchName} `);
  });

  it('should call the onSelection method when patchName selected inthe dropdown', fakeAsync(() => {
    setUpTestForPatchListWithPatch();

    const spy = spyOn(component, 'onSelection');

    const optionSelectList = fixture.debugElement.nativeElement.querySelectorAll('mat-option');
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('.select')).nativeElement;
    select.value = optionSelectList[0].value;
    select.dispatchEvent(new Event('valueChange'));
    tick();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should call the addOnGardenPage method when the add-to-garden button is clicked', () => {
    const spy = spyOn(component, 'addOnGardenPage');

    let patches = numberOfPatch(1);
    component.isLoaded = true;
    component.ngOnInit();
    fixture.detectChanges();

    component.patchControl.setValue(` ${patches[0].patchName} `);
    const button = fixture.debugElement.query(By.css('#add-on-garden-page')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(button.innerText).toBe('Save');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should change the variable isDirty to false when the addToGarden method s called', () => {
    const patch = numberOfPatch(1)[0];
    setUpTestForPatchListWithPatch();

    component.addOnGardenPage(patch, plant);

    expect(component.isDirty).toBeFalse();
  });

  it('should call the service when the AddToGarden method is called', () => {
    const patch = numberOfPatch(1)[0];
    setUpTestForPatchListWithPatch();

    fixture.whenStable().then(() => {
    const spy = spyOn(service, 'savePlantInPatch');

    component.addOnGardenPage(patch, plant);

    expect(spy).toHaveBeenCalledWith(patch, plant);
    });
  });

  it('should call the dialog close method when the AddToGarden method is called', async() => {
    const patch = numberOfPatch(1)[0];
    setUpTestForPatchListWithPatch();

    component.addOnGardenPage(patch, plant);

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should go to the garden page when the AddToGarden method is called', async () => {
    const patch = numberOfPatch(1)[0];
    setUpTestForPatchListWithPatch();

    const spy = spyOn(router, 'navigate');
    numberOfPatch(1);
    component.isLoaded = true;
    component.ngOnInit();
    fixture.detectChanges();

    component.addOnGardenPage(patch, plant);

    expect(spy).toHaveBeenCalledOnceWith(['garden']);
  });

  it('should show the error message when no patch name is selected', () => {
    setUpTestForPatchListWithPatch();

    component.patchControl.setValue('');

    const button = fixture.debugElement.query(By.css('#add-on-garden-page')).nativeElement;
    button.click();
    fixture.detectChanges();

    const spyError = fixture.debugElement.query(By.css('mat-error')).nativeElement;

    expect(spyError).toBeTruthy();
  });

  it('should not show the error message when a patch name is selected', () => {
    setUpTestForPatchListWithPatch();

    component.patchControl.setValue('Test Patch Name');

    const button = fixture.debugElement.query(By.css('#add-on-garden-page')).nativeElement;
    button.click();
    fixture.detectChanges();

    const spyError = fixture.debugElement.query(By.css('mat-error'));

    expect(spyError).toBeNull();
  });

  function numberOfPatch(patchNumber: number): IPatch[] {
    if (patchNumber === 0) {
      return component.patches = [];
    }
    else {
      return component.patches = [{
        patchId: 1,
        patchName: 'Test Patch Name',
        patchImagePicture: 'Test patch Picture',
      }]
    }
  }

  function setUpTestForEmptyPatchList(){
    numberOfPatch(0);
    component.isLoaded = true;
    component.ngOnInit();
    fixture.detectChanges();
  }

  function setUpTestForPatchListWithPatch(){
    numberOfPatch(1);
    component.isLoaded = true;
    component.ngOnInit();
    fixture.detectChanges();
  }

});
