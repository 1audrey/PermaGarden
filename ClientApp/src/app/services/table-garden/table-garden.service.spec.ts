import { TestBed } from '@angular/core/testing';

import { TableGardenService } from './table-garden.service';

describe('TableGardenService', () => {
  let service: TableGardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableGardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
