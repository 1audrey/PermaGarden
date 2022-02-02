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
    const spy = spyOn(service, 'getPlants');
    service.getPlants();

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should save plant`, () => {
    const newPlant = {
      name: "Spring Onions",
      startingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
      startingMethod: "Sowing in pots",
      sowingPeriodInDays: 21,
      harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
      harvestingPeriodInDays: 120,
      plantImagePicture: 'assets/images/spring-onions.jpg',
      }

    const spy = spyOn(service, 'savePlant');
    service.savePlant(newPlant);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it(`should get plant details`, (done) => {
    const fakePlant = {
      name: "Spring Onions",
      startingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
      startingMethod: "Sowing in pots",
      sowingPeriodInDays: 21,
      harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
      harvestingPeriodInDays: 120,
      plantImagePicture: 'assets/images/spring-onions.jpg',
      }

    spyOn(service, 'getPlants').and.returnValue(timer(100).pipe(mapTo([fakePlant])));
    service.getPlants().subscribe(plant => {
      console.log(plant);
      expect(plant).toEqual([fakePlant]);
      done();
    });
  });

});
