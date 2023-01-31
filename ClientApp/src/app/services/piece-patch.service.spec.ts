import { TestBed } from '@angular/core/testing';

import { PiecePatchService } from './piece-patch.service';

describe('PiecePatchService', () => {
  let service: PiecePatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiecePatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
