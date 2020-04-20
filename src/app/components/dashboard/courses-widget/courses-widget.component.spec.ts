import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesWidgetComponent } from './courses-widget.component';

describe('CoursesWidgetComponent', () => {
  let component: CoursesWidgetComponent;
  let fixture: ComponentFixture<CoursesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
