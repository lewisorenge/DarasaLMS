import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerWidgetComponent } from './scheduler-widget.component';

describe('SchedulerWidgetComponent', () => {
  let component: SchedulerWidgetComponent;
  let fixture: ComponentFixture<SchedulerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
