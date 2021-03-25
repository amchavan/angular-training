import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhtableComponent } from './ghtable.component';

describe('GhtableComponent', () => {
  let component: GhtableComponent;
  let fixture: ComponentFixture<GhtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
