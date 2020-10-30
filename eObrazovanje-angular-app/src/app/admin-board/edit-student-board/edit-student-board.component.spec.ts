import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentBoardComponent } from './edit-student-board.component';

describe('EditStudentBoardComponent', () => {
  let component: EditStudentBoardComponent;
  let fixture: ComponentFixture<EditStudentBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
