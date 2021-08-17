import { TestBed } from '@angular/core/testing';

import { PlantImageResolverService } from './plant-image-resolver.service';

describe('PlantImageResolverService', () => {
  let service: PlantImageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantImageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
