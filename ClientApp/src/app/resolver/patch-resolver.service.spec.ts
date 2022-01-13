import { TestBed } from '@angular/core/testing';

import { PatchResolverService } from './patch-resolver.service';

describe('PatchResolverService', () => {
  let service: PatchResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
