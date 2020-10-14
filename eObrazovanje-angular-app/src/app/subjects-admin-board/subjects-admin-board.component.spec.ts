import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsAdminBoardComponent } from './subjects-admin-board.component';

describe('SubjectsAdminBoardComponent', () => {
  let component: SubjectsAdminBoardComponent;
  let fixture: ComponentFixture<SubjectsAdminBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsAdminBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsAdminBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
