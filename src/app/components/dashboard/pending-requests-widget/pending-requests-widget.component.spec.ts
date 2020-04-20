import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestsWidgetComponent } from './pending-requests-widget.component';

describe('PendingRequestsWidgetComponent', () => {
  let component: PendingRequestsWidgetComponent;
  let fixture: ComponentFixture<PendingRequestsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRequestsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
