import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamManagmentComponent } from './exam-managment.component';

describe('ExamManagmentComponent', () => {
  let component: ExamManagmentComponent;
  let fixture: ComponentFixture<ExamManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
