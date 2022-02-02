////import { DebugElement } from '@angular/core';
////import { ComponentFixture, TestBed } from '@angular/core/testing';
////import { By } from '@angular/platform-browser';
////import { ActivatedRoute } from '@angular/router';
////import { FilterPipe } from '../pipe/filter.pipe';
////import { PlantThumbnailComponent } from './plant-thumbnail/plant-thumbnail.component';

////import { PlantsListComponent } from './plants-list.component';
////import { PlantsListResolver } from '../resolver/plants-list-resolver.service';
////import { PlantsService } from '../shared/plants.service';

////describe('PlantsListComponent', () => {
////  let component: PlantsListComponent;
////  let fixture: ComponentFixture<PlantsListComponent>;
////  let de: DebugElement;
////  let mockPlants = [{
////    name: "Spring Onions",
////    startingMonths: [
////      "September"
////    ],
////    startingMethod: "Sowing in pots",
////    sowingPeriodInDays: 21,
////    harvestingMonths: [
////      "January",
////    ],
////    harvestingPeriodInDays: 120,
////    plantImagePicture: "assets/images/spring-onions.jpg"
////  },
////  {
////    name: "Test no Month",
////    startingMonths: [
////      "January"
////    ],
////    startingMethod: "Sowing in pots",
////    sowingPeriodInDays: 21,
////    harvestingMonths: [
////      "January",
////    ],
////    harvestingPeriodInDays: 120,
////    plantImagePicture: "assets/images/spring-onions.jpg"
////  }]

////  beforeEach(async () => {
////    await TestBed.configureTestingModule({
////      declarations: [PlantsListComponent,
////      ],
////      imports: [],
////      providers:
////        [
////          PlantsService,
////          PlantsListResolver,
////          FilterPipe,
////          {
////            provide: ActivatedRoute, useValue: { snapshot: { data: PlantsService.PLANTS } }
////          }
////        ]
////    })
////      .compileComponents();
////  });

////  beforeEach(() => {
////    fixture = TestBed.createComponent(PlantsListComponent);
////    component = fixture.componentInstance;
////    fixture.detectChanges();
////    component.plants = [{
////        name: "Spring Onions",
////        startingMonths: [
////          "September"
////        ],
////        startingMethod: "Sowing in pots",
////        sowingPeriodInDays: 21,
////        harvestingMonths: [
////          "January",
////        ],
////        growingPeriodInDays: 120,
////        plantImagePicture: "assets/images/spring-onions.jpg"

////    }];

////    component.ngOnInit();
////    fixture.detectChanges();

////    component.search = 'Spring';
////    fixture.detectChanges();

////  });

////  it('should create', () => {
////    expect(component).toBeTruthy();
////  });

////  it('should open the Add a new plant page when the button is clicked', () => {
////    const spyObject = document.createElement("a");
////    spyOn(spyObject, "click").and.callFake(() => { });
////    spyOn(document, "createElement").and.returnValue(spyObject);

////    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.add-new-plant')).nativeElement;
////    button.click();
////    fixture.detectChanges();

////    expect(document.createElement).toHaveBeenCalledTimes(1);
////    expect(document.createElement).toHaveBeenCalledWith("a");
////  });

////  it('should render title in a h2 tag', () => {
////    const title = fixture.debugElement.nativeElement;
////    expect(title.querySelector('h2').textContent).toContain('List of plants available');
////  });

////  it('should render text in a p tag', () => {
////    const text = fixture.debugElement.nativeElement;
////    expect(text.querySelector('p').textContent).toContain('Select or create a plant and add it to your garden');
////  });

////  it('should call the filterBySowingMonths method when the button is clicked', () => {
////    const spy = spyOn(component, 'filterBySowingMonths');

////    fixture.debugElement.query(By.css('.see-sow-this-month')).nativeElement.click();

////    expect(spy).toHaveBeenCalledTimes(1);
////  });

////  it('should call the filterAll method when the button is clicked', () => {
////    const spy = spyOn(component, 'filterAll');

////    fixture.debugElement.query(By.css('.see-all')).nativeElement.click();

////    expect(spy).toHaveBeenCalledTimes(1);
////  });

////  it('should be called with whatever the plantDeleted emits', () => {
////    spyOn(component, 'onPlantDeleted');
////    const deletedPlant = de.query(By.directive(PlantThumbnailComponent));
////    const cmp = deletedPlant.componentInstance;
////    cmp.change.emit(1);
////    expect(component.onPlantDeleted).toHaveBeenCalledTimes(1)
////  });

////  it('should decrement the plant list array by one', () => {
////    component.plants.length = 3;
////    component.onPlantDeleted(
////      {
////      name: "Spring Onions",
////      startingMonths: [
////        "September"
////      ],
////      startingMethod:"Sowing in pots",
////      sowingPeriodInDays: 21,
////      harvestingMonths: [
////        "January",
////      ],
////      growingPeriodInDays: 120,
////      plantImagePicture: "assets/images/spring-onions.jpg"
////     });
////    expect(component.plants.length).toEqual(2);
////  });

////  it('should return plants of specified month when the filterBySowingMonths method is called', () => {
////    component.month = 'September';
////    component.plants = mockPlants;
////    component.filterBySowingMonths();
////    const expectedFilteredPlant = [mockPlants[0]];

////    expect(component.plants).toEqual(expectedFilteredPlant);
////  });

////});
