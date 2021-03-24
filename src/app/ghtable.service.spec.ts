import { TestBed } from '@angular/core/testing';

import { GhtableService } from './ghtable.service';

describe('GhtableService', () => {
  let service: GhtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
