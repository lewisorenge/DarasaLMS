import { FormGroup, FormBuilder } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { STUDENT_ROUTES, TEACHER_ROUTES } from '../sidebar/sidebar.component';
import { SidebarMenu, User } from 'src/app/data.models';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  profile: User;
  menuItems: SidebarMenu[];
  showSubmenu = {};
  showSearchbar = false;
  searchOpen = false;
  searchResult = [];
  searcForm: FormGroup;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.subscribeOnSearch();
    if (this.router.url === '/courses') {
      this.showSearchbar = true;
    }
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    if (this.profile.role === 'student') {
      this.menuItems = STUDENT_ROUTES;
    } else if (this.profile.role === 'teacher') {
      this.menuItems = TEACHER_ROUTES;
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/courses') {
          this.showSearchbar = true;
        } else {
         this.showSearchbar = false;
        }
      }
    });
  }

  handleLogOut(): void {
    this.authService.logOut();
  }

  toggleSubMenu(id: number): void {
    this.showSubmenu[id] = !this.showSubmenu[id];
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    this.searchResult = [];
  }

  closeSearchResults(): void {
    this.searchResult = [];
  }

  initSearchForm(): void {
    this.searcForm = this.fb.group({
      search: ['']
    });
  }

  subscribeOnSearch(): void {
    this.searcForm.get('search').valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.coursesService.getCoursesBySearch(value.trim()).subscribe(courses => {
        this.searchResult = courses;
      });
    });
  }

  onCourseSelect(event: Event): void {
    event.preventDefault();
    this.searchResult = [];
  }

}