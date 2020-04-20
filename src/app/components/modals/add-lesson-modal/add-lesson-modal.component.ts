import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/data.models';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.component.html',
  styleUrls: ['./add-lesson-modal.component.scss']
})
export class AddLessonModalComponent implements OnInit {
  @Input() course: Course;
  lessonForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.lessonForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      notes: [null],
      parent_lesson: [null],
      position: [this.course.lessons.length || 0],
    });
  }

  get f(): any { return this.lessonForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.lessonForm.invalid) {
      return;
    }
    const lesson = this.lessonForm.getRawValue();
    lesson.course_id = this.course.id;
    this.coursesService
      .createLesson(lesson)
      .subscribe(response => {
        this.course.lessons.push(response);
        this.activeModal.dismiss();
      });
  }

  public fileChosen(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.lessonForm.patchValue({
      notes: file
    });
    this.lessonForm.get('notes').updateValueAndValidity();
  }

}
