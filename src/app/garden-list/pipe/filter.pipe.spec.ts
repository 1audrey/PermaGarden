import { TestBed } from '@angular/core/testing';
import { FilterPipe} from './filter.pipe';

describe('FilterPipe', () => {
  let filterPipe: FilterPipe;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ FilterPipe, ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    filterPipe = new FilterPipe();
  });

  it('should be instanciated', () => {
    expect(filterPipe).toBeDefined();
  });

});
