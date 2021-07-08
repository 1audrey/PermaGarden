import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantThumbnailComponent } from './plant-thumbnail.component';

describe('PlantThumbnailComponent', () => {
  let component: PlantThumbnailComponent;
  let fixture: ComponentFixture<PlantThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
