import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLecturerBoardComponent } from './edit-lecturer-board.component';

describe('EditLecturerBoardComponent', () => {
  let component: EditLecturerBoardComponent;
  let fixture: ComponentFixture<EditLecturerBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLecturerBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLecturerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
