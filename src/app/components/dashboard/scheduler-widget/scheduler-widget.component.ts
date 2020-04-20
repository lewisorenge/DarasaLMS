import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { formatDistance, isWithinInterval } from 'date-fns';
import { User, Occurrence } from 'src/app/data.models';
import { getTodaysDate, secondsToHms, parseDate } from 'src/app/utils';
import { TimetableService } from 'src/app/services/timetable.service';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-scheduler-widget',
  templateUrl: './scheduler-widget.component.html',
  styleUrls: ['./scheduler-widget.component.scss']
})
export class SchedulerWidgetComponent implements OnInit {
  profile: User;
  occurrence: Occurrence;
  isMeetingRunning = false;
  isClassroomActive = false;
  meetingRoomLink = '';

  constructor(
    private cookieService: CookieService,
    private timetableService: TimetableService,
    private classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    const todaysDate = getTodaysDate(true);
    const params = {
      start: todaysDate.startDate,
      end: todaysDate.endDate,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    this.timetableService
      .getOccurrences(this.profile.calendar, params)
      .subscribe(response => {
        this.occurrence = response[0];
        this.createjoinClassroomLink(this.occurrence);
      });

    setInterval(() => {
      this.createjoinClassroomLink(this.occurrence);
    }, 60000);
  }

  createjoinClassroomLink(occurrence): void {
    if (!occurrence) {
      return;
    }
    this.isClassroomActive = isWithinInterval(
      new Date(),
      {
        start: parseDate(occurrence.start),
        end: parseDate(occurrence.end)
      }
    );
    if (this.isClassroomActive && !this.meetingRoomLink) {
      this.classroomService
        .createJoinClassroomLink(occurrence.classroom.room_id)
        .subscribe(rresp => {
          this.meetingRoomLink = rresp.meeting_room_link;
        });
    }
  }

  getFormatDistance(startDate): string {
    if (!startDate) {
      return '';
    }
    return formatDistance(
      parseDate(startDate),
      new Date(),
      { addSuffix: true }
    );
  }

  getDurationTimeFormat(seconds): string {
    if (!seconds) { return ''; }
    return secondsToHms(seconds);
  }

}
