import { Component, OnInit } from '@angular/core';
import { SidebarMenu, User } from '../../data.models';
import { CookieService } from 'ngx-cookie-service';

export const STUDENT_ROUTES: SidebarMenu[] = [
  { id: 1, path: '/dashboard', title: 'Dashboard', icon: 'home' },
  { id: 2, path: '/timetable', title: 'Timetable', icon: 'calendar' },
  { id: 3, path: '/courses', title: 'Courses', icon: 'book-open' },
];

export const TEACHER_ROUTES: SidebarMenu[] = [
  { id: 1, path: '/dashboard', title: 'Dashboard', icon: 'home' },
  { id: 2, path: '/students', title: 'Students', icon: 'users' },
  { id: 2, path: '/timetable', title: 'Timetable', icon: 'calendar' },
  { id: 3, path: '/courses', title: 'Courses', icon: 'book-open' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  profile: User;
  menuItems: SidebarMenu[];
  showMenu = false;
  showSubmenu = {};

  constructor(
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    if (this.profile.role === 'student') {
      this.menuItems = STUDENT_ROUTES;
    } else if (this.profile.role === 'teacher') {
      this.menuItems = TEACHER_ROUTES;
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleSubMenu(id: number): void {
    this.showSubmenu[id] = !this.showSubmenu[id];
  }

}
