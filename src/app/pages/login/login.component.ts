import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/data.models';
import { AuthService } from 'src/app/services/auth.service';
import { isEmpty } from '../../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  loading = false;
  alerts: Alert[] = [];
  showPassword = false;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    const isAuthenticated: boolean = this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/']);
    }

    // Subscribe to account alerts
    this.auth.alert.subscribe(alert => {
      if (!isEmpty(alert)) {
        this.alerts.push(alert);
      }
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const email = this.form.email;
    const password = this.form.password;

    if (email && password) {
      this.loading = true;
      this.auth.login(email, password)
        .subscribe(authResult => {
          if (authResult.hasOwnProperty('access')) {
            this.loading = false;
            this.auth.setSession(authResult);
          }
        }, (errors) => {
          if (errors.hasOwnProperty('error')) {
            this.loading = false;
            const alert: Alert = {
              type: 'danger',
              message: errors.error.detail,
              closed: false
            };
            setTimeout(() => alert.closed = true, 5000);
            this.alerts.push(alert);
            return;
          }
        });
    }
  }

  closeAlert(alert): void {
    alert.closed = true;
  }

}
