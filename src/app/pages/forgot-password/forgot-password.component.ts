import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertVerificationComponent } from '../../pages/alert-verification/alert-verification.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public submitted = false;
  public alertShow = true;
  public emailSuccessfulySent = false;


  @ViewChild(AlertVerificationComponent) alertVerificationComponent: AlertVerificationComponent;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initEmailForm();
  }

  private initEmailForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]]
    });
  }

  public getControl(controlName: string): FormControl{
    return <FormControl>this.forgotPasswordForm.get(controlName);
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.forgotPasswordForm.valid) {
      const data = this.forgotPasswordForm.getRawValue();
      this.authService.emailVerification(data).subscribe(response => {
        if (response['success']) {
            this.emailSuccessfulySent = true;
            const alertOptions = {
                successMsg: 'Change password',
                userName: 'Name',
                email: data.email,
                action: 'to reset your password'
            };
          this.alertVerification(alertOptions);
        }
      });
    }
  }

  public alertVerification(alertOptions): void {
    this.alertVerificationComponent.open(alertOptions);
  }
}