import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToGardenComponent } from './add-to-garden.component';

describe('AddToGardenComponent', () => {
  let component: AddToGardenComponent;
  let fixture: ComponentFixture<AddToGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToGardenComponent ]
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
});
