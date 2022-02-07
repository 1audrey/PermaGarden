import { TestBed } from '@angular/core/testing';

import { PatchImageService } from './patch-image.service';

describe('PatchImageService', () => {
  let service: PatchImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
