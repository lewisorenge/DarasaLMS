import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = null;
  public courses = [];

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserCourses();
  }
  private getUser(): void {
    this.user = this.authService.getLoggedInUser();
  }
  private getUserCourses(): void {
    if (this.user) {
      this.coursesService.getUserCourses(this.user.id)
        .subscribe(response => {
          this.courses = response.results;
        });
    }
  }

}
