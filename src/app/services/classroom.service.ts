import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }

  checkRunningMeeting(roomId: string): Observable<any> {
    const url = `${environment.baseUrl}rooms/${roomId}/running/`;
    return this.http.get<any>(url);
  }

  createJoinClassroomLink(roomId: string): Observable<any> {
    const url = `${environment.baseUrl}rooms/${roomId}/join/`;
    return this.http.post<any>(url, {});
  }

  requestJoinClassroom(payload): Observable<any> {
    const url = `${environment.baseUrl}requests/`;
    return this.http.post<any>(url, payload);
  }

  createClassroom(classroom): Observable<any> {
    const url = `${environment.baseUrl}classrooms/`;
    return this.http.post<any>(url, classroom);
  }

}
