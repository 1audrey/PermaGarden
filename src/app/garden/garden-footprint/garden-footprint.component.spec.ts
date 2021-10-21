import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenFootprintComponent } from './garden-footprint.component';

describe('GardenFootprintComponent', () => {
  let component: GardenFootprintComponent;
  let fixture: ComponentFixture<GardenFootprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenFootprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenFootprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
