import { TestBed } from '@angular/core/testing';

import { PatchesService } from './patches.service';

describe('PatchesService', () => {
  let service: PatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
