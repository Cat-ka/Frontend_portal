import { TestBed } from '@angular/core/testing';

import { UserSemestralsService } from './user-semestrals.service';

describe('UserSemestralsService', () => {
  let service: UserSemestralsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSemestralsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
