import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { User, Request } from 'src/app/data.models';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty, strTitleCase } from 'src/app/utils';

@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.scss']
})
export class StudentRequestsComponent implements OnInit {
  profile: User;
  requests: Request[] = [];
  selectedFilters: any = { status: 'accepted' };
  filters: any = [
    { status: 'pending', checked: false },
    { status: 'accepted', checked: false },
    { status: 'declined', checked: false },
  ];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  checkAll = false;
  loadingRequests = false;
  searchText = '';
  searchFound = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private requestsService: RequestsService,
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('profile') || null);
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.filterRequests(isEmpty(params) ? this.selectedFilters : params);
      });
  }

  filterRequests(selectedFilters = this.selectedFilters): void {
    if (this.profile?.id) {
      this.loadingRequests = true;
      const params = {
        ...selectedFilters,
        page: this.page,
        page_size: this.pageSize,
      };
      this.requestsService
        .getUserRequests(this.profile?.id, params)
        .subscribe(response => {
          this.collectionSize = response.count;
          this.requests = response.results;
          let courseNames = this.requests.map((req) => {
            return req.course.name;
          });
          courseNames = [...new Set(courseNames)];
          if (!this.filters[this.filters.findIndex(f => courseNames.includes(f.course__name))]) {
            courseNames.forEach((cname) => {
              this.filters.push({ course__name: cname, checked: false });
            });
          }
          this.selectedFilters = selectedFilters;
          this.checkSelectedFilters();
          this.preserveFilterState(this.selectedFilters);
          this.loadingRequests = false;
        });
    }
  }

  setFilterRequests(filter: any): void {
    if (filter.checked) {
      // Unset selected filters
      this.filters.forEach(f => {
        if (filter.status) {
          if (f.status && f.status === this.selectedFilters.status) {
            f.checked = false;
          }
        }
        if (filter.course__name) {
          if (f.course__name && f.course__name === this.selectedFilters.course__name) {
            f.checked = false;
          }
        }
      });
      const oldFilters = this.selectedFilters;
      const newFilter = { ...filter };
      delete newFilter.checked;
      this.selectedFilters = { ...oldFilters, ...newFilter };
    } else {
      for (const [key, value] of Object.entries(filter)) {
        delete this.selectedFilters[key];
      }
    }
  }

  searchRequests(): void {
    if (this.searchText.length >= 2 && this.profile?.id) {
      this.loadingRequests = true;
      this.requestsService
        .getUserRequests(this.profile?.id, { search: this.searchText })
        .subscribe(response => {
          this.collectionSize = response.count;
          this.requests = response.results;
          if (this.requests.length) {
            this.searchFound = true;
          }
          this.searchFound = false;
          this.loadingRequests = false;
        });
    }
  }

  processRequest(requestId: number, status: string): void {
    this.requests.forEach((request, index) => {
      if (request.id === requestId || request.selected) {
        const rId = request.selected ? request.id : requestId;
        this.requestsService
          .processRequest(rId, status)
          .subscribe(response => {
            if (rId === response.id) {
              request.removed = true;
              request.action = status;
              setTimeout(() => {
                // Remove item from requests array after animation
                this.requests = this.removeRequest(this.requests, rId);
              }, 2000);
            }
          });
      }
    });
  }

  removeRequest(requests, value): any {
    return requests.filter((req) => req.id !== value);
  }

  preserveFilterState(filters: {}): void {
    this.router.navigate(['/students'], { queryParams: { ...filters } });
  }

  checkUncheckAll(): void {
    this.requests.forEach(request => {
      request.selected = this.checkAll;
    });
  }

  arrayStringToTitleCase(arr: any): string {
    const str = arr[0];
    return strTitleCase(str);
  }

  checkSelectedFilters(): void {
    const values = Object.values(this.selectedFilters);
    if (values.length) {
      this.filters.forEach(filter => {
        if (values.includes(filter.status || filter.course__name)) {
          filter.checked = true;
        }
      });
    }
  }

  clearFilter(): void {
    this.router.navigate(['/students']);
  }

}
