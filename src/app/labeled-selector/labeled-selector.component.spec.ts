import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledSelectorComponent } from './labeled-selector.component';

describe('LabeledSelectorComponent', () => {
  let component: LabeledSelectorComponent;
  let fixture: ComponentFixture<LabeledSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabeledSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
