import { TestBed } from '@angular/core/testing';

import { GithubtableService } from './githubtable.service';

describe('GithubtableService', () => {
  let service: GithubtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
