import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { MockPipe } from '../mock/mock-pipe';
import { PlantsListComponent } from './plants-list.component';
import { PlantsListResolver } from '../resolver/plants-list-resolver.service';
import { PlantsService } from '../services/plants/plants.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AddNewPlantComponent } from './add-new-plant/add-new-plant.component';
import { PlantThumbnailComponent } from './plant-thumbnail/plant-thumbnail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PlantsListComponent', () => {
  let component: PlantsListComponent;
  let fixture: ComponentFixture<PlantsListComponent>;
  let location: Location;

  beforeEach(async () => {
    const fakeRoute = {
      snapshot: {
        data: {
          plants: [
            {
              plantId: 1,
              plantName: 'Name test',
              plantStartingMonths: 'July',
              plantStartingMethod: 'Starting Method Test',
              plantSowingPeriod: 1,
              plantHarvestingMonths: 'Harvesting Month Test',
              plantGrowingPeriod: 1,
              plantImagePicture: 'Plant Image Test',
            }]
        },
      } as Partial<ActivatedRouteSnapshot>,
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [PlantsListComponent,
        MockPipe,
        PlantThumbnailComponent
      ],
      imports: [HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'add-new-plant', component: AddNewPlantComponent }
        ]),


      ]
      ,
      providers:
        [
          PlantsService,
          PlantsListResolver,
          { provide: ActivatedRoute, useValue: fakeRoute },
        ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.inject(Location)
    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the Add a new plant page when the button is clicked', async () => {
    const button = fixture.debugElement.query(By.css('.add-new-plant')).nativeElement;
    button.click();
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/add-new-plant')
    });
  });

  it('should render title in a h2 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h2').textContent).toContain('Plants');
  });

  it('should render text in a <p> tag', () => {
    const text = fixture.debugElement.nativeElement;
    expect(text.querySelector('p').textContent).toContain('Select or create a plant and add it to your garden');
  });

  it('should call the filterBySowingMonths method when the button is clicked', () => {
    const spy = spyOn(component, 'filterBySowingMonths');
    fixture.debugElement.query(By.css('.see-sow-this-month')).nativeElement.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set applied filter to true when the filterBySowingMonths button is clicked', () => {
    component.month = 'July'

    component.filterBySowingMonths();

    expect(component.appliedFilter).toBeTrue();
  });

  it('should set applied filter to false when the filterAll button is clicked', () => {
    component.month = 'July'

    component.filterBySowingMonths();
    expect(component.appliedFilter).toBeTrue();

    component.filterAll();
    expect(component.appliedFilter).toBeFalse();
  });

  it('should return a list of filtered plants when the month button is clicked', () => {
    component.month = 'July';
    component.plants = [{
      plantId: 1,
      plantName: 'Name test',
      plantStartingMonths: 'July',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'Harvesting Month Test',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    },
    {
      plantId: 2,
      plantName: 'Name test',
      plantStartingMonths: 'August',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'Harvesting Month Test',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    },
    ]

    let expectedPlantList = [{
      plantId: 1,
      plantName: 'Name test',
      plantStartingMonths: 'July',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'Harvesting Month Test',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    }]
    component.filterBySowingMonths();

    expect(component.filteredPlant.length).toEqual(expectedPlantList.length);
    expect(component.filteredPlant).toEqual(expectedPlantList);
  });

  it('should call the filterAll method when the button is clicked', () => {
    const spy = spyOn(component, 'filterAll');

    fixture.debugElement.query(By.css('.see-all')).nativeElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return the all the plants when the All button is clicked', () => {
    component.month = 'August';
    let actualPlants = component.plants;

    let expectedPlantList = [{
      plantId: 1,
      plantName: 'Name test',
      plantStartingMonths: 'July',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'Harvesting Month Test',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    }]
    component.filterBySowingMonths();
    expect(component.filteredPlant.length).not.toEqual(actualPlants.length);

    component.filterAll();
    expect(actualPlants.length).toEqual(expectedPlantList.length);
    expect(actualPlants).toEqual(expectedPlantList);
  });

  it('should returns the plants on ngOnInit', () => {
    let expectedPlants = [{
      plantId: 1,
      plantName: 'Name test',
      plantStartingMonths: 'July',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'Harvesting Month Test',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    }]

    component.ngOnInit();

    expect(component.plants).toEqual(expectedPlants);
  });

  it('should call the plantToDelete method when the delete button on the thumbnail is clicked', () => {
      const spy = spyOn(component, 'plantToDelete');
      const plantThumbnail = fixture.debugElement.query(By.directive(PlantThumbnailComponent));
      const plantThumbnailcomponent = plantThumbnail.componentInstance;
      plantThumbnailcomponent.plantDeleted.emit(1);

      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call the plantToDelete method when the delete button on the thumbnail is clicked', () => {
    let expectedPlants = {
      plantId: 1,
      plantName: 'Name test',
      plantStartingMonths: 'July',
      plantStartingMethod: 'Starting Method Test',
      plantSowingPeriod: 1,
      plantHarvestingMonths: 'Harvesting Month Test',
      plantGrowingPeriod: 1,
      plantImagePicture: 'Plant Image Test',
    };
    const spy = spyOn(component, 'plantToDelete');
    const plantThumbnail = fixture.debugElement.query(By.directive(PlantThumbnailComponent));
    const plantThumbnailcomponent = plantThumbnail.componentInstance;
    plantThumbnailcomponent.plantDeleted.emit(expectedPlants);

    expect(spy).toHaveBeenCalledTimes(1);
});

it('should call the plantToDelete method with the selected plant when the delete button on the thumbnail is clicked', () => {
  let expectedPlants = {
    plantId: 1,
    plantName: 'Name test',
    plantStartingMonths: 'July',
    plantStartingMethod: 'Starting Method Test',
    plantSowingPeriod: 1,
    plantHarvestingMonths: 'Harvesting Month Test',
    plantGrowingPeriod: 1,
    plantImagePicture: 'Plant Image Test',
  };
  const spy = spyOn(component, 'plantToDelete');
  const plantThumbnail = fixture.debugElement.query(By.directive(PlantThumbnailComponent));
  const plantThumbnailcomponent = plantThumbnail.componentInstance;
  plantThumbnailcomponent.plantDeleted.emit(expectedPlants);

  expect(spy).toHaveBeenCalledOnceWith(expectedPlants);
});

it('should call the onPlantDeleted method when the delete button on the thumbnail is clicked', () => {
  let expectedPlants = {
    plantId: 1,
    plantName: 'Name test',
    plantStartingMonths: 'July',
    plantStartingMethod: 'Starting Method Test',
    plantSowingPeriod: 1,
    plantHarvestingMonths: 'Harvesting Month Test',
    plantGrowingPeriod: 1,
    plantImagePicture: 'Plant Image Test',
  };
  const spy = spyOn(component, 'onPlantDeleted');
  const plantThumbnail = fixture.debugElement.query(By.directive(PlantThumbnailComponent));
  const plantThumbnailcomponent = plantThumbnail.componentInstance;
  plantThumbnailcomponent.plantDeleted.emit(expectedPlants);

  expect(spy).toHaveBeenCalledTimes(1);
});

  it('should decrement the plant list array by one when onPlantDeleted is called', () => {
   let actualPlant = component.plants[0];
   component.onPlantDeleted(actualPlant);

   expect(component.plants.length).toEqual(0);
  });
});
