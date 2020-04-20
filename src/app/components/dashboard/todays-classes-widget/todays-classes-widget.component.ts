import { Component, OnInit } from '@angular/core';
import { User, Occurrence } from 'src/app/data.models';
import { getTodaysDate, parseDate } from 'src/app/utils';
import { CookieService } from 'ngx-cookie-service';
import { TimetableService } from 'src/app/services/timetable.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-todays-classes-widget',
  templateUrl: './todays-classes-widget.component.html',
  styleUrls: ['./todays-classes-widget.component.scss']
})
export class TodaysClassesWidgetComponent implements OnInit {
  profile: User;
  occurrences: Occurrence[];
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
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
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
