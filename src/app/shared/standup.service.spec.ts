import { TestBed } from '@angular/core/testing';

import { StandupService } from './standup.service';

describe('StandupService', () => {
  let service: StandupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
