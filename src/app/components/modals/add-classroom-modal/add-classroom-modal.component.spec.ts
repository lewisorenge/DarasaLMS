import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassroomModalComponent } from './add-classroom-modal.component';

describe('AddClassroomModalComponent', () => {
  let component: AddClassroomModalComponent;
  let fixture: ComponentFixture<AddClassroomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassroomModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassroomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
