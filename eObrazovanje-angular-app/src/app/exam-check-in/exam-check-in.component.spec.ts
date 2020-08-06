import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCheckInComponent } from './exam-check-in.component';

describe('ExamCheckInComponent', () => {
  let component: ExamCheckInComponent;
  let fixture: ComponentFixture<ExamCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
