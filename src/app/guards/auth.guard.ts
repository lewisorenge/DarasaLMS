import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    private cookieService: CookieService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = next.data.expectedRole;

    // Store last active URL prior to logout, so user can be redirected on re-login
    this.cookieService.set('returnUrl', JSON.stringify(state.url), null, '/');

    if (!this.auth.isAuthenticated()) {
      // BLOCKED BY AUTH GUARD
      this.router.navigate(['login']);
      return false;
    }
    // AUTH GUARD PASSED
    return true;
  }

}
