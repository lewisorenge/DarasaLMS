import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { TimetableService } from './services/timetable.service';
import { CoursesService } from './services/courses.service';
import { ClassroomService } from './services/classroom.service';
import { RequestsService } from './services/requests.service';
import { UsersService } from './services/users.service';
import { EducationalStagesService } from './services/educational-stages.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PagesModule,
    NgbModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    TimetableService,
    CoursesService,
    ClassroomService,
    RequestsService,
    UsersService,
    EducationalStagesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
