import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsNotificationsComponent } from './home-news-notifications.component';

describe('HomeNewsNotificationsComponent', () => {
  let component: HomeNewsNotificationsComponent;
  let fixture: ComponentFixture<HomeNewsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNewsNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNewsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
