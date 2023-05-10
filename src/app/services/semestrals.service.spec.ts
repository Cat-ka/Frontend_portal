import { TestBed } from '@angular/core/testing';

import { SemestralsService } from './semestrals.service';

describe('SemestralsService', () => {
  let service: SemestralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemestralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
