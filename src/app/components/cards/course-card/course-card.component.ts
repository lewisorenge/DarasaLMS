import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/data.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoCourseDetail(course): void {
    if (course?.id) {
      this.router.navigate([`/courses/${course?.id}`]);
    }
  }

}
