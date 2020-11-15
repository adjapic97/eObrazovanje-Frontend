import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCheckOutComponent } from './exam-check-out.component';

describe('ExamCheckOutComponent', () => {
  let component: ExamCheckOutComponent;
  let fixture: ComponentFixture<ExamCheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCheckOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
