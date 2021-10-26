import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatchComponent } from './create-patch.component';

describe('CreatePatchComponent', () => {
  let component: CreatePatchComponent;
  let fixture: ComponentFixture<CreatePatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
