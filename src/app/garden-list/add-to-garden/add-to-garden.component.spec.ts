import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantsListResolver } from '../resolver/plants-list-resolver.service';
import { PlantsService } from '../shared/plants.service';

import { AddToGardenComponent } from './add-to-garden.component';

describe('AddToGardenComponent', () => {
  let component: AddToGardenComponent;
  let fixture: ComponentFixture<AddToGardenComponent>;
  const mockDialogRef = {close: jasmine.createSpy('close')};

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AddToGardenComponent ],
      imports: [
        MatDialogModule,


      ],
      providers:[
        PlantsService,
        PlantsListResolver,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { } },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the dialog when cancel button is clicked', () => {
    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
  });


});
