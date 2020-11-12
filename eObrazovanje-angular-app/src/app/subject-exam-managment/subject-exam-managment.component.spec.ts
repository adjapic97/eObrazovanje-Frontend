import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExamManagmentComponent } from './subject-exam-managment.component';

describe('SubjectExamManagmentComponent', () => {
  let component: SubjectExamManagmentComponent;
  let fixture: ComponentFixture<SubjectExamManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectExamManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectExamManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
