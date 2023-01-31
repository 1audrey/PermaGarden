import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenTableComponent } from './garden-table.component';

describe('GardenTableComponent', () => {
  let component: GardenTableComponent;
  let fixture: ComponentFixture<GardenTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
