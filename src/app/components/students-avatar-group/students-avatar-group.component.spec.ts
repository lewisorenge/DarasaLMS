import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAvatarGroupComponent } from './students-avatar-group.component';

describe('StudentsAvatarGroupComponent', () => {
  let component: StudentsAvatarGroupComponent;
  let fixture: ComponentFixture<StudentsAvatarGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsAvatarGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAvatarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
