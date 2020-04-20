import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Course, User } from 'src/app/data.models';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-widget',
  templateUrl: './courses-widget.component.html',
  styleUrls: ['./courses-widget.component.scss']
})
export class CoursesWidgetComponent implements OnInit {
  profile: User;
  courses: Course[] = [];
  filter = 'enrolled';

  constructor(
    private cookieService: CookieService,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.filterCourses('enrolled');
  }

  filterCourses(status): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    if (status === 'enrolled') {
      if (this.profile?.id) {
        this.coursesService
          .getUserCourses(this.profile.id)
          .subscribe(resp => {
            this.courses = resp.results;
            this.filter = 'enrolled';
          });
      }
    } else if (status === 'recommended') {
      const params = {
        recommended: true
      };
      if (this.profile.role === 'student') {
        // tslint:disable-next-line: no-string-literal
        params['educational_stages'] = this.profile?.student?.educational_stage?.id;
      }
      this.coursesService
        .getCourses(params)
        .subscribe(response => {
          this.courses = response.results;
          this.filter = 'recommended';
        });
    }
  }

}
