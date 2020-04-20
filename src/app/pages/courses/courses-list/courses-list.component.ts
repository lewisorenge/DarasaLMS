import { Component, OnInit } from '@angular/core';
import { User, Course } from 'src/app/data.models';
import { CookieService } from 'ngx-cookie-service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  profile: User;
  enrolledCourses: Course[] = [];
  recommendedCourses: Course[] = [];
  loadingUserCourses = false;
  loadingCourses = false;

  constructor(
    private cookieService: CookieService,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    if (this.profile?.id) {
      this.loadingUserCourses = true;
      this.coursesService
        .getUserCourses(this.profile.id)
        .subscribe(resp => {
          this.enrolledCourses = resp.results;
          this.loadingUserCourses = false;
        });

      if (this.profile?.role === 'student') {
        this.loadingCourses = true;
        const params = {
          educational_stages: this.profile?.student?.educational_stage?.id,
          recommended: true
        };
        this.coursesService
          .getCourses(params)
          .subscribe(response => {
            this.recommendedCourses = response.results;
            this.loadingCourses = false;
          });
      }
    }
  }

}
