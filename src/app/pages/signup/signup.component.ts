import { UsersService } from './../../services/users.service';
import { AlertVerificationComponent } from './../../pages/alert-verification/alert-verification.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

    public loading = false;
    public successfulyRegistered = false;
    @ViewChild(AlertVerificationComponent) alertVerificationComponent: AlertVerificationComponent;

    // Student
    public studentForm: FormGroup;
    public studentPasswordVisible = false;
    public studentRepeatPasswordVisible = false;
    public studentSubmitted = false;

    // Teacher
    public teacherForm: FormGroup;
    public teacherPasswordVisible = false;
    public teacherRepeatPasswordVisible = false;
    public teacherSubmitted = false;
    public certificateTouched = false;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.initStudentForm();
    this.initTeacherForm();
  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      document.querySelector('body').classList.add('loaded');
      this.isloaded = true;
    }, 300);
  }

  private alertVerification(alertOptions): void {
    this.alertVerificationComponent.open(alertOptions);
  }

  // Student
  public initStudentForm(): void {
    this.studentForm = this.formBuilder.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]],
        password: ['', [Validators.required]],
        repeatPassword: ['']
    });
  }

  public getStudentControl(controlName: string): FormControl {
    return this.studentForm.get(controlName) as FormControl;
  }

  public onStudentSubmit(): void {
    this.studentSubmitted = true;
    if (this.studentForm.valid && this.areStudentsPasswordsIdentic()) {
        const studentFormData = this.studentForm.getRawValue();
        const studentData = {
            first_name: studentFormData.firstname,
            last_name: studentFormData.lastname,
            email: studentFormData.email,
            password: studentFormData.password,
            role: 'student'
        };

        const successData = {
            successMsg: 'Account Created Successfully',
            userName: studentFormData.firstname,
            email: studentFormData.email,
            action: 'to activate your account'
        };
        this.usersService.createUser(studentData).subscribe();


    }
  }

  public areStudentsPasswordsIdentic(): boolean {
    return this.getStudentControl('password').value === this.getStudentControl('repeatPassword').value;
  }

  changeStudentsPasswordStatus(): void {
    this.studentPasswordVisible = !this.studentPasswordVisible;
  }

  changeStudentsRepeatPasswordStatus(): void {
    this.studentRepeatPasswordVisible = !this.studentRepeatPasswordVisible;
  }

   // Teacher
   public initTeacherForm(): void {
    this.teacherForm = this.formBuilder.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]],
        password: ['', [Validators.required]],
        repeatPassword: [''],
        certificate: [null, Validators.required]
    });
  }

  public getTeacherControl(controlName: string): FormControl {
    return this.teacherForm.get(controlName) as FormControl;
  }

  public onTeacherSubmit(): void {
    this.teacherSubmitted = true;
    if (this.teacherForm.valid && this.areTeacherPasswordsIdentic()) {
        this.successfulyRegistered = true;
        const teacherData = this.studentForm.getRawValue();
        this.alertVerification({
            successMsg: 'Account Created Successfully',
            userName: teacherData.firstname,
            email: teacherData.email,
            action: 'to activate your account'
        });

    }
  }

  public areTeacherPasswordsIdentic(): boolean {
    return this.getTeacherControl('password').value === this.getTeacherControl('repeatPassword').value;
  }

  changeTeacherPasswordStatus(): void {
    this.teacherPasswordVisible = !this.teacherPasswordVisible;
  }

  changeTeacherRepeatPasswordStatus(): void {
    this.teacherRepeatPasswordVisible = !this.teacherRepeatPasswordVisible;
  }

  public onCertificateTouch(): void {
      setTimeout(_ => {
        this.certificateTouched = true;
      }, 1000);
  }

}
