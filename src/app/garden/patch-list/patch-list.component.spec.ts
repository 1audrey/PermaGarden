import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchListComponent } from './patch-list.component';

describe('PatchListComponent', () => {
  let component: PatchListComponent;
  let fixture: ComponentFixture<PatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should emit the event when delete method is called', () => {
    spyOn(component.patchDeleted, 'emit').and.callThrough();
    component.delete();
    fixture.detectChanges();
    expect(component.patchDeleted.emit).toHaveBeenCalled();
  });

  it('should return the state of the toggle', () => {
    spyOn(component, 'toggle');

    component.toggle();
    fixture.detectChanges();

    expect(component.state).toEqual('expanded');

    component.toggle();
    fixture.detectChanges();

    expect(component.state).toEqual('collapsed');
  });
});
