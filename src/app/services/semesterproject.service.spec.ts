import { TestBed } from '@angular/core/testing';

import { SemesterprojectService } from './semesterproject.service';

describe('SemesterprojectService', () => {
  let service: SemesterprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
