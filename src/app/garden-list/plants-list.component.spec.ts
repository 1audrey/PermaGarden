import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { PlantsListComponent } from './plants-list.component';
import { PlantsListResolver } from './resolver/plants-list-resolver.service';
import { PlantsService } from './shared/plants.service';

describe('GardenListComponent', () => {
  let component: PlantsListComponent;
  let fixture: ComponentFixture<PlantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsListComponent ],
      imports: [],
      providers:
      [
        PlantsService,
        PlantsListResolver,

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {data: 'plants'}
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the Add a new plant page when the button is clicked', () => {
    const spyObject = document.createElement("a");
    spyOn(spyObject, "click").and.callFake(() => { });
    spyOn(document, "createElement").and.returnValue(spyObject);

    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.add-new-plant')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith("a");
  });

  it('should render title in a h2 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h2').textContent).toContain('List of plants available');
  });

  it('should render text in a p tag', () => {
    const text = fixture.debugElement.nativeElement;
    expect(text.querySelector('p').textContent).toContain('Pick a plant and add them to your garden');
  });

});
