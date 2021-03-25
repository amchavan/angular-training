import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubtableComponent } from './githubtable.component';

describe('GithubtableComponent', () => {
  let component: GithubtableComponent;
  let fixture: ComponentFixture<GithubtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
