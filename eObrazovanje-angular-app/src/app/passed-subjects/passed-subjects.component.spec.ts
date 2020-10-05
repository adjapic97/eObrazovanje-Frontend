import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedSubjectsComponent } from './passed-subjects.component';

describe('PassedSubjectsComponent', () => {
  let component: PassedSubjectsComponent;
  let fixture: ComponentFixture<PassedSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassedSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
