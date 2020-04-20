import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    const url = `${environment.baseUrl}accounts/users`;
    return this.http.get<any>(url);
  }

  public getTeachers(): Observable<any> {
    const url = `${environment.baseUrl}accounts/users?role=teacher`;
    return this.http.get<any>(url);
  }

  public getStudents(): Observable<any> {
    const url = `${environment.baseUrl}accounts/users?role=student`;
    return this.http.get<any>(url);
  }

  public createUser(userData): Observable<any> {
    const url = `${environment.baseUrl}posts/`;
    return this.http.post<any>(url, userData);
   
  }

}
