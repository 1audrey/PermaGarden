import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPatch } from 'src/app/garden/garden-footprint/models/ipatch-model';
import { PatchesService } from 'src/app/shared/patches.service';
import { PlantsListResolver } from '../../resolver/plants-list-resolver.service';
import { PlantsService } from '../../shared/plants.service';

import { AddToGardenComponent } from './add-to-garden.component';

describe('AddToGardenComponent', () => {
  let component: AddToGardenComponent;
  let fixture: ComponentFixture<AddToGardenComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };
  let patchService :PatchesService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AddToGardenComponent],
      imports: [
        MatDialogModule,


      ],
      providers: [
        PlantsService,
        PlantsListResolver,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PatchesService, useValue: patchService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    patchService= new PatchesService();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the dialog when cancel button is clicked', () => {
    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
  });

  xit('should call the createPatch method when the button is clicked', fakeAsync(() => {

    component.patches.length === 0;
    fixture.detectChanges();

      const spy = spyOn(component, 'createPatch');

      let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.create-patch');
      button.click();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);

  }));

  it('should call the service on ngOnInit and set property isLoading to true', (done) => {
    const spy = spyOn(patchService, 'getPatch').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.isLoading).toBeTrue();
      done();

    });
  });
});
