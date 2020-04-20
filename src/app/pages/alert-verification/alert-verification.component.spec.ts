import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertVerificationComponent } from './alert-verification.component';

describe('AlertVerificationComponent', () => {
  let component: AlertVerificationComponent;
  let fixture: ComponentFixture<AlertVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
