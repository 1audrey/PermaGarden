import { TestBed } from '@angular/core/testing';

import { ArchivedTasksResolver } from './archived-tasks-resolver.service';

describe('ArchivedTasksResolverService', () => {
  let service: ArchivedTasksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivedTasksResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
