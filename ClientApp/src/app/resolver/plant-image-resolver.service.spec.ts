import { TestBed } from '@angular/core/testing';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { PlantImageService } from '../shared/plant-image.service';

import { PlantImageResolverService } from './plant-image-resolver.service';

describe('PlantImageResolverService', () => {
  let service: PlantImageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        PlantImageResolverService,
        PlantImageService
      ]
    });
    service = TestBed.inject(PlantImageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get plant image`, () => {
    const spy = spyOn(service, 'resolve');
    service.resolve();

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  //it(`should get plant image details`, (done) => {
  //  let fakePlantImage =
  //  {
  //      title: 'Green Beans',
  //      imageUrl: 'assets/images/green-beans.jpg'
  //  }

  //  spyOn(service, 'resolve').and.returnValue(timer(100).pipe(mapTo([fakePlantImage])));
  //  service.resolve().subscribe(plantImage => {
  //    console.log(plantImage);
  //    expect(plantImage).toEqual([fakePlantImage]);
  //    done();
  //  });
  //});
});
