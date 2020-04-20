import { TestBed } from '@angular/core/testing';

import { EducationalStagesService } from './educational-stages.service';

describe('EducationalStagesService', () => {
  let service: EducationalStagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalStagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
