import { TestBed } from '@angular/core/testing';

import { SinglePatchShapeResolverService } from './single-patch-shape-resolver.service';

describe('SinglePatchShapeResolverService', () => {
  let service: SinglePatchShapeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglePatchShapeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
