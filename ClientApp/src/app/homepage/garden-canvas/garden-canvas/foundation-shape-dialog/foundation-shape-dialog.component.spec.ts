import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationShapeDialogComponent } from './foundation-shape-dialog.component';

describe('FoundationShapeDialogComponent', () => {
  let component: FoundationShapeDialogComponent;
  let fixture: ComponentFixture<FoundationShapeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationShapeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationShapeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
