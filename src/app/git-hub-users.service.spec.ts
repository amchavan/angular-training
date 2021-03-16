import { TestBed } from '@angular/core/testing';

import { GitHubUsersService } from './git-hub-users.service';

describe('GitHubUsersService', () => {
  let service: GitHubUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
