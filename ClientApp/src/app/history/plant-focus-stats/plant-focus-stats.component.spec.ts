import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantFocusStatsComponent } from './plant-focus-stats.component';

describe('PlantFocusStatsComponent', () => {
  let component: PlantFocusStatsComponent;
  let fixture: ComponentFixture<PlantFocusStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantFocusStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantFocusStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
