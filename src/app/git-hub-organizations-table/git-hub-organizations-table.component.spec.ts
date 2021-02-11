import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitHubOrganizationsTableComponent } from './git-hub-organizations-table.component';

describe('GitHubOrganizationsTableComponent', () => {
  let component: GitHubOrganizationsTableComponent;
  let fixture: ComponentFixture<GitHubOrganizationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitHubOrganizationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitHubOrganizationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
