import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPassedSubjectsComponent } from './non-passed-subjects.component';

describe('NonPassedSubjectsComponent', () => {
  let component: NonPassedSubjectsComponent;
  let fixture: ComponentFixture<NonPassedSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonPassedSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPassedSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
