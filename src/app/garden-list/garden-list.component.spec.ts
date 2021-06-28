import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenListComponent } from './garden-list.component';

describe('GardenListComponent', () => {
  let component: GardenListComponent;
  let fixture: ComponentFixture<GardenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
