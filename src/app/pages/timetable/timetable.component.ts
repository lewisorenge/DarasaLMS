import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { CookieService } from 'ngx-cookie-service';
import { TimetableService } from 'src/app/services/timetable.service';
import { getCurrentMonthStartEndDates } from 'src/app/utils';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, AfterContentChecked {
  todayDate: Date = new Date();
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    themeSystem: 'bootstrap',
    scrollTime: '09:00:00',
  };

  constructor(
    private cookieService: CookieService,
    private timetableService: TimetableService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const profile = JSON.parse(this.cookieService.get('profile') || null);
    const currentMonthStartEndDates = getCurrentMonthStartEndDates();
    const params = {
      start: currentMonthStartEndDates.startDate,
      end: currentMonthStartEndDates.endDate,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    this.timetableService
      .getOccurrences(profile?.calendar, params)
      .subscribe(response => {
        this.calendarOptions.events = response;
      });
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
  }

  handleEventClick(clickInfo: EventClickArg): void {
  }

  handleEvents(events: EventApi[]): void {
  }

}
