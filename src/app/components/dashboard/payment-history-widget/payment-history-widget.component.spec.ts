import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryWidgetComponent } from './payment-history-widget.component';

describe('PaymentHistoryWidgetComponent', () => {
  let component: PaymentHistoryWidgetComponent;
  let fixture: ComponentFixture<PaymentHistoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHistoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
