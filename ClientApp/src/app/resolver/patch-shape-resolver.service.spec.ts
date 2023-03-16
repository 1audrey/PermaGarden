import { TestBed } from '@angular/core/testing';

import { PatchShapeResolverService } from './patch-shape-resolver.service';

describe('PatchShapeResolverService', () => {
  let service: PatchShapeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchShapeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
