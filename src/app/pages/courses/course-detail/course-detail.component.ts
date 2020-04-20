import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course, User } from 'src/app/data.models';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from 'src/app/services/classroom.service';
import { AddClassroomModalComponent } from 'src/app/components/modals/add-classroom-modal/add-classroom-modal.component';
import { AddLessonModalComponent } from 'src/app/components/modals/add-lesson-modal/add-lesson-modal.component';
import { AddPostModalComponent } from 'src/app/components/modals/add-post-modal/add-post-modal.component';
import { format } from 'date-fns';
import { parseDate } from 'src/app/utils';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  profile: User;
  submittedRequest = false;
  joinedCourse = false;
  requestedCourse = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private cookieService: CookieService,
    private classroomService: ClassroomService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    this.activatedRoute.params
      .subscribe(params => {
        this.coursesService
          .getCourse(params?.id)
          .subscribe(response => {
            this.course = response;
            this.hasRequestedCourse();
            this.hasJoinedCourse();
          });
      });
  }

  hasRequestedCourse(): void {
    this.coursesService
      .hasRequestedCourse(this.course.id)
      .subscribe(response => {
        this.requestedCourse = response?.status;
      });
  }

  hasJoinedCourse(): void {
    this.coursesService
      .hasJoinedCourse(this.course.id)
      .subscribe(response => {
        this.joinedCourse = response?.status;
      });
  }

  addClass(): void {
    const modalRef = this.modalService.open(AddClassroomModalComponent, { size: 'lg' });
    modalRef.componentInstance.course = this.course;
  }

  addPost(category: string): void {
    const modalRef = this.modalService.open(AddPostModalComponent, { size: 'lg' });
    modalRef.componentInstance.course = this.course;
    modalRef.componentInstance.category = category;
  }

  enrollCourse(): void {
    if (this.submittedRequest || this.requestedCourse) {
      return;
    }
    const payload = {
      course_id: this.course.id,
      user_id: this.profile.id,
    };
    this.classroomService
      .requestJoinClassroom(payload)
      .subscribe(response => {
        if (response?.id) {
          this.submittedRequest = true;
        }
      });
  }

  addLesson(): void {
    const modalRef = this.modalService.open(AddLessonModalComponent, { size: 'lg' });
    modalRef.componentInstance.course = this.course;
  }

  formatDate(date): string {
    if (!date) {
      return '';
    }
    return format(parseDate(date), 'DD.MM.YYYY');
  }

}
