import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs/operators';
import { CoursesService } from './../../../services/courses.service';
import { UsersService } from './../../../services/users.service';
import { EducationalStage, Teacher, Student, User } from 'src/app/data.models';
import { EducationalStagesService } from 'src/app/services/educational-stages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  profile: User;
  courseForm: FormGroup;
  submitted = false;

  students: Student[] = [];
  teachers: Teacher[] = [];
  educationalStages: EducationalStage[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cookieService: CookieService,
    private educationalStagesService: EducationalStagesService,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    this.getEducationalStages();
    this.getTeachers();
    this.courseForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      educational_stages: [null, Validators.required],
      classroom_join_mode: ['join_all'],
      teacher: [null, Validators.required],
      assistant_teachers: [null],
      cover: [null, Validators.required],
    });
  }

  get f(): any { return this.courseForm.controls; }

  getEducationalStages(): void {
    this.educationalStagesService
      .getEducationalStages()
      .pipe(delay(500))
      .subscribe(response => {
        this.educationalStages = response?.results;
      });
  }

  getTeachers(): void {
    this.usersService
      .getTeachers()
      .pipe(delay(500))
      .subscribe(response => {
        this.teachers = response?.results.map(user => {
          user.full_name = `${user.first_name} ${user.last_name}`;
          return user;
        });
      });
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.courseForm.invalid) {
      return;
    }
    const course = this.courseForm.getRawValue();
    this.coursesService
      .createCourse(course)
      .subscribe(response => {
        this.router.navigate([`/courses/${response?.id}`]);
      });
  }

  public fileChosen(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.courseForm.patchValue({
      cover: file
    });
    this.courseForm.get('cover').updateValueAndValidity();
  }

}
