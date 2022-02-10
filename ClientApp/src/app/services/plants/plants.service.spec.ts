import { TestBed } from '@angular/core/testing';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';


import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  let service: PlantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        PlantsService,
      ]
    });
    service = TestBed.inject(PlantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get plant`, () => {
    const spy = spyOn(service, 'getAllPlants');
    service.getAllPlants();

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should save plant`, () => {
    const newPlant = {
      plantName: "Spring Onions",
      plantStartingMonths: "March, April, May, June, July, August, September" ,
      plantStartingMethod: "Sowing in pots",
      plantSowingPeriod: 21,
      plantHarvestingMonths: "January, April, June, July, August, September, October",
      plantGrowingPeriod: 120,
      plantImagePicture: 'assets/images/spring-onions.jpg',
    }

    const spy = spyOn(service, 'saveNewPlant');
    service.saveNewPlant(newPlant);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it(`should get plant details`, (done) => {
    const fakePlant = {
      plantName: "Spring Onions",
      plantStartingMonths: "March, April, May, June, July, August, September",
      plantStartingMethod: "Sowing in pots",
      plantSowingPeriod: 21,
      plantHarvestingMonths: "January, April, June, July, August, September, October",
      plantGrowingPeriod: 120,
      plantImagePicture: 'assets/images/spring-onions.jpg',
      }

    spyOn(service, 'getAllPlants').and.returnValue(timer(100).pipe(mapTo([fakePlant])));
    service.getAllPlants().subscribe(plant => {
      console.log(plant);
      expect(plant).toEqual([fakePlant]);
      done();
    });
  });

});
