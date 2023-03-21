import { TestBed } from '@angular/core/testing';

import { ArchivedPlantsResolverService } from './archived-plants-resolver.service';

describe('ArchivedPlantsResolverService', () => {
  let service: ArchivedPlantsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivedPlantsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
