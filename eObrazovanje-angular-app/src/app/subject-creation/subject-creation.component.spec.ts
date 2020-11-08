import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCreationComponent } from './subject-creation.component';

describe('SubjectCreationComponent', () => {
  let component: SubjectCreationComponent;
  let fixture: ComponentFixture<SubjectCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
