import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  public passwordVisible = false;
  public repeatPasswordVisible = false;
  public submitted = false;

  public newPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = true;
    this.initNewPasswordForm();
  }

  private initNewPasswordForm(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      repeatedPassword: ['']
    });
  }
  public onSubmit(): void {
    this.submitted = true;
    if (this.newPasswordForm.valid && this.arePasswordsIdentic()) {
      // Send to server...
    }
  }

  public getControl(controlName: string): FormControl {
    return <FormControl> this.newPasswordForm.get(controlName);
  }

  public arePasswordsIdentic(): boolean {
    return this.getControl('password').value === this.getControl('repeatedPassword').value;
  }

  changePasswordStatus(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  changeRepeatPasswordStatus(): void {
    this.repeatPasswordVisible = !this.repeatPasswordVisible;
  }


}
