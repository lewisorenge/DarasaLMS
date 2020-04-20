import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/data.models';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.scss']
})
export class AddPostModalComponent implements OnInit {
  @Input() course: Course;
  @Input() category: string;
  postForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      parent_post: [null],
    });
  }

  get f(): any { return this.postForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }
    const post = this.postForm.getRawValue();
    post.course_id = this.course.id;
    post.category = this.category;
    this.coursesService
      .createPost(post)
      .subscribe(response => {
        this.course.posts.push(response);
        this.activeModal.dismiss();
      });
  }


}
