import { TestBed } from '@angular/core/testing';

import { ArchivedTaskService } from './archived-task.service';

describe('ArchivedTaskService', () => {
  let service: ArchivedTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivedTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
