import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RectangleDialogComponent } from './rectangle-dialog.component';

describe('RectangleDalogComponent', () => {
  let component: RectangleDialogComponent;
  let fixture: ComponentFixture<RectangleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
