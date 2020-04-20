import { Component, OnInit } from '@angular/core';
import { User, Occurrence } from 'src/app/data.models';
import { CookieService } from 'ngx-cookie-service';
import { TimetableService } from 'src/app/services/timetable.service';
import { getTodaysDate, parseDate } from 'src/app/utils';
import { format } from 'date-fns';

@Component({
  selector: 'app-classroom-widget',
  templateUrl: './classroom-widget.component.html',
  styleUrls: ['./classroom-widget.component.scss']
})
export class ClassroomWidgetComponent implements OnInit {
  profile: User;
  occurrences: Occurrence[] = [];
  showNavigationArrows = false;
  interval = 10000;

  constructor(
    private cookieService: CookieService,
    private timetableService: TimetableService,
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    const todaysDate = getTodaysDate();
    const params = {
      start: todaysDate.startDate,
      end: todaysDate.endDate,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      include_students: true
    };
    this.timetableService
      .getOccurrences(this.profile.calendar, params)
      .subscribe(response => {
        this.occurrences = response;
      });
  }

  formatTime(dateTimeString): string {
    return format(parseDate(dateTimeString), 'h:mm aaaa');
  }

}
