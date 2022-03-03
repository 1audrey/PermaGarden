import { TestBed } from '@angular/core/testing';

import { SinglepatchResolverService } from './singlepatch-resolver.service';

describe('SinglepatchResolverService', () => {
  let service: SinglepatchResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglepatchResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
