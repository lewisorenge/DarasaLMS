import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient) { }

  getOccurrences(calendarId: number, params: any): Observable<any> {
    const url = `${environment.baseUrl}timetable/calendars/${calendarId}/occurrences/`;
    return this.http.get<any>(url, { params });
  }

}
