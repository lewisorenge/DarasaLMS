import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysClassesWidgetComponent } from './todays-classes-widget.component';

describe('TodaysClassesWidgetComponent', () => {
  let component: TodaysClassesWidgetComponent;
  let fixture: ComponentFixture<TodaysClassesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysClassesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysClassesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
