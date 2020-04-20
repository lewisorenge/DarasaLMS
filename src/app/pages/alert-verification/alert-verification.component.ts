import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-verification',
  templateUrl: './alert-verification.component.html',
  styleUrls: ['./alert-verification.component.scss']
})
export class AlertVerificationComponent implements OnInit {


  @HostBinding('class.open') isOpen = false;

  successOptions: {successMsg: string, userName: string, email: string, action: string } = null;

  constructor() { }

  ngOnInit(): void {}

  open(options: { successMsg: string, userName: string, email: string, action: string }): void {
    this.successOptions = options;
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.successOptions = null;
  }

}
