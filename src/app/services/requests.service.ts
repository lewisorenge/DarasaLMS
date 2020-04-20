import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  getUserRequests(userId: string, params: any = {}): Observable<any> {
    const url = `${environment.baseUrl}users/${userId}/requests/`;
    return this.http.get<any>(url, { params });
  }

  processRequest(requestId: number, status: string): Observable<any> {
    const url = `${environment.baseUrl}requests/${requestId}/`;
    return this.http.patch<any>(url, { status });
  }

}
