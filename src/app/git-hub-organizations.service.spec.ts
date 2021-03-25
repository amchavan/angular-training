import { TestBed } from '@angular/core/testing';

import { GitHubOrganizationsService } from './git-hub-organizations.service';

describe('GitHubOrganizationsService', () => {
  let service: GitHubOrganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubOrganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
