import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data.models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profile: User;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
  }

}
