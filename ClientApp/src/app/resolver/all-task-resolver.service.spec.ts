import { TestBed } from '@angular/core/testing';

import { AllTaskResolverService } from './all-task-resolver.service';

describe('AllTaskResolverService', () => {
  let service: AllTaskResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTaskResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
