import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatchTasksComponent } from './manage-patch-tasks.component';

describe('ManagePatchTasksComponent', () => {
  let component: ManagePatchTasksComponent;
  let fixture: ComponentFixture<ManagePatchTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePatchTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePatchTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
