import { TestBed } from '@angular/core/testing';
import { PlantImageService } from './plant-image.service';


describe('PlantImageService', () => {
  let service: PlantImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        PlantImageService,
      ]
    });
    service = TestBed.inject(PlantImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get plant image`, () => {
    const spy = spyOn(service, 'getPlantsImage');
    service.getPlantsImage();

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
