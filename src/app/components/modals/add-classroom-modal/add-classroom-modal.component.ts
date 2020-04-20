import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/data.models';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-add-classroom-modal',
  templateUrl: './add-classroom-modal.component.html',
  styleUrls: ['./add-classroom-modal.component.scss']
})
export class AddClassroomModalComponent implements OnInit {
  @Input() course: Course;
  classForm: FormGroup;
  submitted = false;
  colors = [
    { hexColorCode: '#1ABC9C' },
    { hexColorCode: '#F39C12' },
    { hexColorCode: '#3498DB' },
    { hexColorCode: '#9B59B6' },
    { hexColorCode: '#34495E' },
    { hexColorCode: '#F1C40F' },
    { hexColorCode: '#E74C3C' },
    { hexColorCode: '#7F8C8D' },
  ];
  selectedColor = '#1ABC9C';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
  ) { }

  ngOnInit(): void {
    this.classForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      welcome_message: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(0)]],
      start_datetime: ['', [Validators.required]],
      repeat: ['WEEKLY', [Validators.required]],
      repeat_until: ['', [Validators.required]],
      color: [this.selectedColor, [Validators.required]],
    });
  }

  get f(): any { return this.classForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.classForm.invalid) {
      return;
    }
    const classroom = this.classForm.getRawValue();
    classroom.course_id = this.course.id;
    this.classroomService
      .createClassroom(classroom)
      .subscribe(response => {
        this.course.classrooms.push(response);
        this.activeModal.dismiss();
      });
  }

  onSelectColor(hexColorCode: string): void {
    this.selectedColor = hexColorCode;
    this.classForm.controls.color.setValue(this.selectedColor);
  }

}
