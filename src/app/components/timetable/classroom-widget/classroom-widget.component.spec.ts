import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomWidgetComponent } from './classroom-widget.component';

describe('ClassroomWidgetComponent', () => {
  let component: ClassroomWidgetComponent;
  let fixture: ComponentFixture<ClassroomWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
