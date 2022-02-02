////import { TestBed } from '@angular/core/testing';
////import { timer } from 'rxjs';
////import { mapTo } from 'rxjs/operators';
////import { PlantsService } from '../shared/plants.service';
////import { PlantsListResolver } from './plants-list-resolver.service';

////describe('PlantsListResolver', () => {
////  let service: PlantsListResolver;

////  beforeEach(() => {
////    TestBed.configureTestingModule({
////      providers:[
////        PlantsListResolver,
////        PlantsService
////      ]
////    });
////    service = TestBed.inject(PlantsListResolver);
////  });

////  it('should be created', () => {
////    expect(service).toBeTruthy();
////  });

////  it(`should get plant`, () => {
////    const spy = spyOn(service, 'resolve');
////    service.resolve();

////    expect(spy).toBeDefined();
////    expect(spy).toHaveBeenCalledTimes(1);
////  });

////  it(`should get plant details`, (done) => {
////    const fakePlant = {
////      name: "Spring Onions",
////      startingMonths: ["March", "April", "May", "June", "July", "August", "September"] ,
////      startingMethod: "Sowing in pots",
////      sowingPeriodInDays: 21,
////      harvestingMonths: ["January", "April", "June", "July", "August", "September", "October"],
////      harvestingPeriodInDays: 120,
////      plantImagePicture: 'assets/images/spring-onions.jpg',
////      }

////    spyOn(service, 'resolve').and.returnValue(timer(100).pipe(mapTo([fakePlant])));
////    service.resolve().subscribe(plant => {
////      console.log(plant);
////      expect(plant).toEqual([fakePlant]);
////      done();
////    });
////  });
////});
