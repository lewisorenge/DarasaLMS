import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { Alert, User } from '../data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _alert = new BehaviorSubject<Alert>(null);
  public alert = this._alert.asObservable();

  constructor(
    private router: Router,
    private cookieService: CookieService,
    public http: HttpClient
  ) { }

  login(email: string, password: string): Observable<object> {
    const url = environment.baseUrl + 'accounts/login/';
    const payload = {
      email,
      password
    };
    return this.http.post(url, payload);
  }

  setSession(authResult): void {
    const accessToken = authResult.access;
    const refreshToken = authResult.refresh;
    const jwtPayload = jwt_decode(accessToken);
    const { is_active, exp, user_id, role } = jwtPayload;

    if (is_active === false) {
      this.logOut();
      const alert = {
        type: 'warning',
        message: 'Your account has not yet been activated.',
        closed: false
      };
      setTimeout(() => alert.closed = true, 5000);
      this._alert.next(alert);
    } else if (is_active === true) {
      // No support. Use a fallback such as browser cookies or store on the server.
      this.cookieService.set('accessToken', accessToken, null, '/');
      this.cookieService.set('refreshToken', refreshToken, null, '/');
      this.cookieService.set('expiresIn', exp, null, '/');
      this.cookieService.set('role', role, null, '/');
      this.getProfile(user_id)
        .subscribe(profile => {
          const acceptedRoles = ['student', 'teacher'];
          if (profile) {
            if (!acceptedRoles.includes(profile?.role)) {
              this.logOut();
              const alert = {
                type: 'info',
                message: 'You can only login using a student or teacher account.',
                closed: false
              };
              setTimeout(() => alert.closed = true, 5000);
              this._alert.next(alert);
            }
            this.cookieService.set('profile', JSON.stringify(profile), null, '/');
            const returnUrl = JSON.parse(this.cookieService.get('returnUrl') || null);
            this.router.navigateByUrl(returnUrl || '/');
          }
        });
    }
  }

  clearAuthState(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
    this.cookieService.delete('expiresIn');
    this.cookieService.delete('role');
    this.cookieService.delete('profile');
    this.cookieService.delete('returnUrl');
  }

  getProfile(userId): Observable<User> {
    const url = environment.baseUrl + `accounts/users/${userId}/`;
    return this.http.get<User>(url);
  }

  logOut(): void {
    this.clearAuthState();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the access token's expiry time
    const currentTime = Math.round(new Date().getTime() / 1000);
    const accessToken = this.cookieService.get('accessToken');
    const refreshToken = this.cookieService.get('refreshToken');
    const expiresIn = this.cookieService.get('expiresIn');
    if (!accessToken || !refreshToken || !expiresIn) {
      return false;
    }
    return currentTime < Number(expiresIn);
  }

  getAuthToken(): string {
    const accessToken = this.cookieService.get('accessToken');
    if (!accessToken) {
      return null;
    }
    return accessToken;
  }

  getLoggedInUser(): any {
    return JSON.parse(this.cookieService.get('profile'));
  }

  emailVerification(payload): Observable<any> {
    const url = environment.baseUrl + 'accounts/password/reset/request/';
    return this.http.post(url, payload);
  }

  changePassword(payload): Observable<any> {
    const url = environment.baseUrl + 'accounts/password/reset/';
    return this.http.post(url, payload);
  }

  
}

