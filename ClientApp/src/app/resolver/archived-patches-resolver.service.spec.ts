import { TestBed } from '@angular/core/testing';

import { ArchivedPatchesResolverService } from './archived-patches-resolver.service';

describe('ArchivedPatchesResolverService', () => {
  let service: ArchivedPatchesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivedPatchesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
