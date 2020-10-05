import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCheckInTableComponent } from './exam-check-in-table.component';

describe('ExamCheckInTableComponent', () => {
  let component: ExamCheckInTableComponent;
  let fixture: ComponentFixture<ExamCheckInTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCheckInTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCheckInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
