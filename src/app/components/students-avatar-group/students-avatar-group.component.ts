import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/data.models';

@Component({
  selector: 'app-students-avatar-group',
  templateUrl: './students-avatar-group.component.html',
  styleUrls: ['./students-avatar-group.component.scss']
})
export class StudentsAvatarGroupComponent implements OnInit {

  @Input() students: Student[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
