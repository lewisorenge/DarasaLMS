import { Component, OnInit, Input } from '@angular/core';
import { Classroom } from 'src/app/data.models';
import { secondsToHms } from 'src/app/utils';

@Component({
  selector: 'app-classroom-card',
  templateUrl: './classroom-card.component.html',
  styleUrls: ['./classroom-card.component.scss']
})
export class ClassroomCardComponent implements OnInit {

  @Input() classroom: Classroom;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

  getDurationTimeFormat(seconds): string {
    if (!seconds) { return ''; }
    return secondsToHms(seconds);
  }

}
