import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageShapeDialogComponent } from './image-shape-dialog.component';

describe('ImageShapeDialogComponent', () => {
  let component: ImageShapeDialogComponent;
  let fixture: ComponentFixture<ImageShapeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageShapeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageShapeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
