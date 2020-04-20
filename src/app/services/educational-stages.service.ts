import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationalStagesService {

  constructor(private http: HttpClient) { }

  getEducationalStages(): Observable<any> {
    const url = `${environment.baseUrl}accounts/educational-stages/`;
    return this.http.get<any>(url);
  }

}
