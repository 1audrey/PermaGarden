import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchListDetailsComponent } from './patch-list-details.component';

describe('PatchListDetailsComponent', () => {
  let component: PatchListDetailsComponent;
  let fixture: ComponentFixture<PatchListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
